---
category: '개발환경'
tags: ['yarn','monorepo','workspace']
thumbnailUrl: '/thumbnail/yarn.png'
createdAt: '2023-08-12 10:48'
---

## yarn workspace

yarn workspace 는 yarn 의 monorepo 기능입니다. monorepo 는 여러개의 패키지를 하나의 저장소에서 관리하는 것을 말하는데, 이를 사용하면, 여러개의 패키지를 한번에 관리할 수 있는 장점이 있습니다.   
저같은 경우에는 node 서버와, react 프론트를 함께 개발해야 할때, type 정의는 같이 사용하고 싶은 경우에 유용하게 사용해 보았습니다.   

> ❗ yarn1 기준으로 합니다.

### 프로젝트 init

```bash
yarn init 
```

### package.json 수정

```json
{
  "name": "monorepo",
  "private": true, // yarn1 에서는 private: true 를 해주어야합니다.
  "workspaces": [
    "packages/*" // monorepo 로 관리할 패키지들의 경로를 지정해줍니다.
  ]
}
```

### 하위 패키지 만들기

지정한 workspace 폴더 내에서 각각의 패키지를 만들면 됩니다. 저는 예를 들어서 host 라는 next 패키지를 하나만들고, ui 라는 react 패키지 두개를 만들어 서로 연동해보겠습니다.

#### next 프로젝트 생성

```bash
mkdir packages
cd packages
yarn create next-app host # 패키지명 host
```

#### react 프로젝트 생성

```bash
yarn create vite # 패키지명 ui
```

### 두 프로젝트 실행

```bash
yarn workspace host dev
yarn workspace ui dev
```

### ui 패키지에서 버튼 컴포넌트 작성

```tsx
interface Props {
    text: string;
    onClick: () => void;
}
export default function Button({text, onClick}: Props){
    return (
        <button onClick={onClick} style={{
            backgroundColor: '#2b2b2b',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}>{text}</button>
    )
}
```

### host package.json 에서 종속성 추가

```json
"dependencies":{
    // ...
    "ui": "workspace:*"
}
```

### host 에서 사용

```tsx
import Button from "ui/src/components/Button";

export default function Home() {
  return (
    <div>
        <Button text={'HI'} onClick={()=> console.log('click!')}/>
    </div>
  )
}
```

> ❗ 여기서 parse 에러가 나는데, nextjs 의 webpack 설정을 수정해주어야합니다. 적접 수정하는 방법과 실험적 기능을 키는 방법이 있습니다.

#### 방법 1(권장)

```js
// next.config.js
module.exports = {
    // ...
    experimental:{
        externalDir: true
    }
};
```

#### 방법 2

> 이 방법은 방법1 을 알기전에, 단순히 파싱에러길레 웹팩 설정 수정해줬던 방법인데 이렇게 도 해결이 된다는 것을 참고할 용도로 봐주시고 위 방법을 사용하세요.

```js
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        {
          loader: "esbuild-loader"
        },
      ],
    });
    config.plugins.push(new webpack.ProvidePlugin({
      React : 'react',
    }))

    return config;
  },
```

끝입니다! 간단하게 yarn workspace 를 이용하여 monorepo 를 구성하고 공통 패키지인 ui 패키지를 분리하고 host 에서 사용해보았습니다.

### 참고

[Github](https://github.com/livemehere/monorepo-example)