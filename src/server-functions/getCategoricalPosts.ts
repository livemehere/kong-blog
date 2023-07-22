import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  meta: {
    title: string;
    createdAt: string;
    updatedAt: string;
    category?: string;
    tags: string[];
    thumbnailUrl?: string;
  };
  content: string;
}

export function getRecentPosts(): Post[] {
  const result: Post[] = [];
  const files = _getFiles(path.join(process.cwd(), 'markdown-posts'));
  const sortedFiles = files.sort((a, b) => {
    const statA = fs.statSync(a);
    const statB = fs.statSync(b);
    return statB.birthtimeMs - statA.birthtimeMs;
  });
  for (const file of sortedFiles) {
    const post = _parseMarkdown(file);
    result.push(post);
  }
  return result;
}

export function getPostByFileName(filename: string): Post | undefined {
  const posts = getRecentPosts();
  return posts.find((file) => file.meta.title === filename);
}

/* 중첩된 폴더를 순회하며 모든 파일 path 를 반환합니다. */
function _getFiles(dirPath: string): string[] {
  const files = fs.readdirSync(dirPath);
  const result: string[] = [];
  for (const file of files) {
    const stat = fs.statSync(path.join(dirPath, file));
    const isDir = stat.isDirectory();
    if (!isDir) {
      result.push(path.join(dirPath, file));
    } else {
      const finalData = _getFiles(path.join(dirPath, file));
      result.push(...finalData);
    }
  }
  return result;
}

/* .md 파일을 파싱합니다. */
function _parseMarkdown(filename: string): Post {
  const fileContents = fs.readFileSync(filename, 'utf8');
  const stat = fs.statSync(filename);
  const matterData = matter(fileContents);
  return {
    meta: {
      category: matterData.data.category,
      tags: matterData.data.tags ?? [],
      thumbnailUrl: matterData.data.thumbnailUrl,
      title: path.basename(filename).replace('.md', ''),
      createdAt: stat.birthtime.toString(),
      updatedAt: stat.mtime.toString(),
    },
    content: matterData.content,
  };
}

/* 요곳만 사용하면 됩니다. 빌드타임에 한번 실행 🚨 진짜 빌드타임 한번이기 때문에, 개발환경일 때도, 파일에 변화가 생기면 재시작 해야됨 */
/* SSG 할때는 상관없지만, SSR 할때는 변수로 담아서 사용하는게 딱한번 실행되서 성능적으로 좋다. */
const markdownPosts = getRecentPosts();
