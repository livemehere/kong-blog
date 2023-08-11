---
category: '개발환경'
tags: ['webpack', 'esbuild', 'loader','번들러']
thumbnailUrl: '/thumbnail/webpack-thumb.png'
---

## esbuild 

esbuild 는 Go 로 만들어진 자바스크립트 번들러입니다.   
Go 가 언어적 특성상 빠른 속도를 자랑하는데, 그로인하여 Go 로 만들어지는 빌드 툴이 속속 생기고있고, esbuild 는 그중 하나입니다.   

esbuild 는 ECMA 문법, typescript 컴파일, js minify 등을 지원합니다.   
babel, tsc, terser 등을 대체할 수 있습니다.(with 빠른속도)    
웹팩을 사용할 때에는 `babel-loader`, `ts-loader` 를 `esbuild-loader` 로 대체할 수 있습니다. minify 플러그인도 들어있구요.   

https://github.com/esbuild-kit/esbuild-loader/discussions/138   
위 github 의 이슈링크를 한번 보시면, 여러 사람들이 공유해준 `esbuild-loader` 의 성능테스트 결과를 보실 수 있습니다. 통상 50%의 속도향상을 본거같아요.

또한 tsx 도 지원하고, 타입스크립트를 즉시 컴파일할 수 있는 향상된 node runtime 이라고도 소개하고있습니다.

## esbuild-loader

이것을 웹팩에서 사용하기 위해 만들어진게 `esbuild-loader` 입니다.   

```bash
npm i -D esbuild-loader
```

설치후에 아래의 `babel-loader`, `ts-loader` 를 대체해주면 됩니다.

**as-is**
```js
{
    test: /\.js$/,
    use: 'babel-loader'
},
{
    test: /\.tsx?$/,
    use: 'ts-loader';
},
```

**to-be**
```js
{
    test: /\.[jt]sx?$/,
    use: 'esbuild-loader'
}
```

### options

#### 컴파일 target

```js
{
     test: /\.jsx?$/,
     loader: 'esbuild-loader',
     options: {
        target: 'es2015', // esbuild-loader 의 기본 타켓은 ESNext 입니다. 기본적으로 어떤 transpile 도 하지 않기 때문에, 이 옵션을 통해 타겟을 지정해주어야합니다.
     },
 }
```

#### typescript

```js
{
     test: /\.tsx?$/,
     loader: 'esbuild-loader',
     options: {
        tsconfig: path.resolve(__dirname, 'tsconfig.custom.json'), // 프로젝트의 루트에 tscofnig.json 이있다면, 자동으로 인식합니다. 하지만 지정하고싶다면, 이 옵션을 통해 tsconfig 를 지정해주어야합니다.
     },
 }
```

다만 타입스크립트는 유의할 점이 몇가지 있습니다.   

- 타입체크를 하지 않고, 트렌스파일링만 합니다. 타입체크는 에디터에 맞기고, 최종 빌드할때만 타입체크를 하는게 일반적이긴 한데, esbuild 는 선택이아닌 필수동작입니다. 따라서 d.ts 파일이 생성되지 않기도 합니다.
  - tsc 를 `--noEmit` 옵션으로 실행하거나, webpack 의 경우 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) 을 사용하여 번들하는 동안 타입체크를 할 수 있습니다.
- 번들된 파일은 모두 `'use strict'` 가 붙습니다. 
- `isolatedModules` 는 반드시 활성화 해야합니다. 
- `esModuleInterop` 는 활성화 하는 것이 좋습니다.
- `emitDecoratorMetadata` 는 지원하지 않습니다.

> 이외에도 몇몇가지 특징이 있는데, 사용하면서 체크해도 충분한 것 같습니다.

### Minification

esbuild-loader 는 플러그인으로 minification 을 지원합니다.   
대표적으로 Terser 혹은 UglifyJS 를 사용했었는데, [성능지표](https://github.com/privatenumber/minification-benchmarks) 를 확인해보시면, 더 빠른 속도를 자랑합니다.   

```js
 optimization: {
  minimizer:[
    new EsbuildPlugin({
      target: 'es2015', // minify 할 때 사용할 문법을 지정합니다. 버전별로 해당 문법을 활용합니다.
    })
  ]
}
```

> 결과물을 비교해보면, 불필요한 공백이 제거되고, 변수명이 짧아지는 것을 확인할 수 있습니다.

### css minify

웹팩에서 js 뿐만아니라, css 도 번들대상으로 할 경우 2가지 경우가 있습니다.   

1. css 파일을 번들링하여 js 파일에 포함시키는 경우 (style-loader 를 사용하는 경우)
2. css 파일을 추출하여 html link 태그로 포함시키는 경우 (이때는 html-webpack-plugin 을 사용해야합니다)

첫번째의 경우에는 minify 할 수 없고(esbuild-loader 를 사용하면 가능), 두번째의 경우에는 minify 할 수 있습니다.(css 가 js 와 분리된 상황에서만 가능)   
esbuild 가 아닌 방법으로는 아래의 두 플러그인을 사용하여 minify 할 수 있습니다.

```js 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

```

1. style-loader 는 css 를 js 에서 사용할 수 있도록 해주는 로더인데, 이것을 MiniCssExtractPlugin.loader 로 대체합니다(.css 로 추출)
2. 그렇게 추출된 css 를 CssMinimizerPlugin 을 통해 minify 합니다.
3. 그런데 CssMinimizerPlugin 를 esbuild-loader 에 내장되어있는 minify 를 사용하여 대체할 수 있습니다(성능상 이점은 없고, 플러그인 하나를 줄이는 정도의 이점)

```js
const path = require('path');
const {EsbuildPlugin} = require('esbuild-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 추가!
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // 추가!
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'ESNext',
        css:true // 추가!
      })
    ]
  },
}
```

### css in js minify

esbuild-loader 를 통해서 css in js 를 minify 할 수 있습니다.   

```js
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        {
            loader:'esbuild-loader',
            options: {
                minify:true
            }
        }
    ]
}
```

> 이렇게 다양한 선택지를 하나의 로더로 통합할 수 있다는 점이 매우 좋습니다.

### 끝내면서

esbuild-loader 를 사용하면, babel-loader, ts-loader 등 여러 로더를 사용하지않고, 하나로 통합 할 수 있습니다.   
성능도 빠르고, 플러그인으로 minify 도 지원하고, css in js 의 miniy 도 지원합니다.   
여러모로, 안쓸래야 안쓸수없는 종합선물세트가 아닌가 싶습니다 ㅎㅎ   
[esbuild-loader 설정 example](https://github.com/esbuild-kit/esbuild-loader-examples) 을 참고해보셔도 좋을 것 같아요 :)

