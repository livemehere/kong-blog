import { Html, Head, Main, NextScript } from 'next/document';
import { IS_PROD } from '@src/config';

/* 공통으로 SSR 되는 html 마크업 */
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        {IS_PROD && (
          <>
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
          </>
        )}
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
