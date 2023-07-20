import { Html, Head, Main, NextScript } from 'next/document';

/* 공통으로 SSR 되는 html 마크업 */
export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
