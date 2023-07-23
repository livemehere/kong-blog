import { DOMAIN } from './src/config';

const defaultSeoConfig = {
  title: '홈',
  titleTemplate: "%s | Dev Kong's 블로그",
  description:
    '웹 개발자 공태민의 블로그입니다. 웹 개발의 전반적인 기술을 다룹니다. 특히나 수학, 물리, 캔버스에 관심이 많고, 많은 연구를 하며 기술을 공유합니다. 또한, 블로그를 통해 개발자로서의 성장을 기록합니다. 주요 기술 스택은 Javascript, Typescript, React, HTML Canvas, Three.js, Next.js 입니다.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: DOMAIN,
    siteName: "Dev Kong's 블로그",
    title: "Dev Kong's 블로그",
    description: '개발자 Kong의 블로그입니다.',
    images: [
      {
        url: `${DOMAIN}/logo.jpg`,
        width: 800,
        height: 600,
        alt: "Dev Kong's 블로그",
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSeoConfig;
