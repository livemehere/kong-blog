import { globby } from 'globby';
import prettier from 'prettier';
import fs from 'fs';

const domain = 'https://www.rhdxoals.com';
const currentDate = new Date().toISOString();

build();
async function build(){
  const sitemap = await generateSiteMap();
  try{
    await fs.promises.writeFile('public/sitemap.xml', sitemap, 'utf8');
    console.log('public/sitemap.xml generated!');
  }catch(e){
    console.log(e);
  }
}

async function generateSiteMap() {
  const staticUrlMaps = await _getStaticUrlMap();
  const markdownPostUrlMaps = await _getDynamicUrlMap('markdown-posts/**/*.md');
  const siteMpaXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrlMaps.trim()}
      ${markdownPostUrlMaps.trim()}
    </urlset>
  `
  return prettier.format(siteMpaXml, { parser: 'html',printWidth:200 });
}
async function _getStaticUrlMap() {
  const staticPaths = await globby([
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/**/[title].tsx',
    '!pages/api',
    '!pages/404.tsx',
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!pages/_error.tsx',
  ]);
  return `
    ${staticPaths.map(path=>{
    const url = path
      .replace('pages', '')
      .replace('.tsx', '')
      .replace('/index', '')
    console.log(`${domain}${url} is generated!`);
    return `
            <url>
              <loc>${`${domain}${url}`}</loc>
            </url>`
  }).join('')}
  `
}
async function _getDynamicUrlMap(pattern) {
  const dynamicPaths = await globby(['pages/**/[title].tsx',]);
  const markdownPaths = await globby([pattern]);
  const base = `${domain}${dynamicPaths[0].replace('pages', '').replace('.tsx', '').replace('[title]', '')}`;
  return `
    ${markdownPaths.map(path=>{
    const url = path
      .replace('markdown-posts/', '')
      .replace('.md', '')
    console.log(`${base}${encodeURI(url)}(${url}) is generated!`);
    return `
            <url>
              <loc>${`${base}${encodeURI(url)}`}</loc>
              <lastmod>${currentDate}</lastmod>
              <priority>1.00</priority>
            </url>`
  }).join('')}  
  `
}

