import { Html, Head, Main, NextScript } from 'next/document';

/* 공통으로 SSR 되는 html 마크업 */
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GTDJQ4G9SN"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-GTDJQ4G9SN');
          </script>
        `,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
