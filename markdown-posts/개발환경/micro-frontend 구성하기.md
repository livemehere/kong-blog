---
category: '개발환경'
tags: ['yarn','monorepo','workspace','micro-frontend']
thumbnailUrl: '/thumbnail/yarn.png'
createdAt: '2023-08-12 16:45'
---

## 마이크로 프론트엔드

마이크로 프론트엔드는 하나의 웹앱을 여러개의 작은 웹앱으로 나누어서 개발하는 방법론 입니다.   
이렇게 나누어진 작은 웹앱들은 각각의 독립적인 웹앱으로 개발되고, 배포되지만 사용자 입장에서는 하나의 웹앱으로 보여집니다.

이 것은 방법론 이기 때문에, 명확히 어떻게 해야한다 라는게 없습니다. 하지만 번들러를 사용하는 웹개발 환경에서는 Module Federation 이라는 방법을 사용해서 구현할 수 있습니다.

> 💡 Module Federation 은 webpack, vite, rollup 등 각 번들러마다 플러그인을 지원하고 있습니다.

## 1. 모노레포 구성

개발편의상 모노레포로 구성을 합니다.

```bash
yarn init -y
```

```json
// package.json
{
  "name": "2.micro-frontend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

```bash
mkdir packages
cd packages
```

## 2. remote 로 사용할 react 환경 구성

```bash
mkdir ui
cd ui
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin esbuild-loader
yarn add react react-dom
yarn add -D @types/react @types/react-dom
```

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules:[
            {
                test:/\.[jt]sx?/,
                use:'esbuild-loader',
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        // remote 로 내보낼 파일 정의
        new ModuleFederationPlugin({
            name:'ui',
            filename:'remoteEntry.js',
            exposes:{
                './NiceButton': './src/components/NiceButton',
                './NiceInput': './src/components/NiceInput',
            },
        })
    ]
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "allowJs": true,
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

```html
<!-- index.html -->
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

```tsx
// src/index.tsx
import {createRoot} from "react-dom/client";
import App from "@/App";

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);
```

## 3. remote 로 노출할 컴포넌트 작성

```tsx
// src/components/NiceButton.tsx
interface Props {
    text: string;
    color: string;
}
export default function NiceButton({text, color}: Props){
    return <button style={{color}}>{text}</button>
}
```

```tsx
// src/components/NiceInput.tsx
export default function NiceInput(){
    return <input type="text" placeholder={'nice input'}/>
}
```

## 4. next.js 로 host 환경 구성 

```bash
yarn create next-app # 프로젝트명 host
```

웹팩 설정을 수정해줍니다. ui 라는 이름으로 불러올 remote 를 정의합니다.

```js
// next.config.js
const webpack = require('webpack');
const PRODUCTION = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.plugins.push(
            new webpack.container.ModuleFederationPlugin({
                name:'host',
                remotes:{
                    ui: PRODUCTION ? 'https://CDNURL.com/remoteEntry.js' :'ui@http://localhost:8080/remoteEntry.js'
                },
            }))
        return config
    }
}

module.exports = nextConfig
```

tsconfig.json 으로 path 를 remote 에 맞게 설정해서 타입 추론이 가능하도록 해줍니다

```json
// tsconfig.json
// ...
 "paths": {
    "@/*": [
      "./src/*"
    ],
    "ui/*": [
        "../ui/src/components/*"
    ]
}
},
```

## 5. host 에서 remote 컴포넌트 사용

반드시 ssr 을 false 로 설정해야 합니다.

```tsx
import dynamic from "next/dynamic";

const NiceButton = dynamic(() => import("ui/NiceButton"),{ ssr: false });
const NiceInput = dynamic(() => import("ui/NiceInput"),{ ssr: false });

export default function Home() {
  return (
    <>
        <div>HI</div>
        <NiceButton text={'HI'} color={'red'}/>
        <NiceInput/>
    </>
  )
}
```

## 마무리

작성하다보니, 첨언할게 딱히 없고.. 코드만 나열하게 되네요.   
물론 저도 삽질을 꽤나 했지만 결과적으로는 잘 돌아가도록 구성하고, 원리만 이해하고있으면 되니까요.   

마이크로 프론트엔드라 함은, 여러가지 모듈을 개발할때 패키지 단위로 구분하여 완전히 격리된 빌드,배포환경을 구성하는 것입니다. 단순히 모노레포로 구성하게 된다면 연관된 패키지들 끼리 빌드에 영향을 주게 되는데, 이를 방지하기 위해 마이크로 프론트엔드를 사용합니다.   

내가 어떤 코드를 리팩토링한다고 할때, 이 코드가 다른 코드에 미치는 영향에 따라서 망설이게 되는데, 그 부분이 완전히 해소된 것이죠. 각각 개발하고 빌드하고 배포해서, 서로간에 영향을 주지않고, 런타임에 통합되는 것입니다.   
서비스 규모가 크고, 여러가지가 통합되어 제공된다면 이런 방식이 아주 유용할 것 같습니다. 실제로 NHN, 토스, 카카오 등에서도 사용하고 있다고 합니다. 저도 이전 직장에서 일찍이 알았다면 도입해볼만한 환경이었는데 아쉬움이 남네요 ㅎㅎ!

## 참고

[Github](https://github.com/livemehere/micro-frontend-example)