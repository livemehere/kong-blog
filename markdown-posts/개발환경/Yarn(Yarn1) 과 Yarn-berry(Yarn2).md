---
category: '개발환경'
tags: ['npm','yarn','yarn-berry','패키지 관리']
thumbnailUrl: '/thumbnail/yarn.png'
---

## Yarn(Yarn1) 과 Yarn-berry(Yarn2)

### Yarn 이란?

yarn 은 npm 과 같은 javascript 패키지 매니저입니다.   
yarn 이 처음 출시되던 시점에는 npm 과 몇몇 차이점이 있었습니다.

- `yarn.lock` 파일을 통해 의존성 패키지의 버전을 고정할 수 있다는 점
- npm 보다 빠른 설치 속도(병렬 설치, 캐싱)

위와 같은 장점이 있었지만, npm 은 node.js 와 함께 제공되면서 생태계 사이즈에서의 차이가 났었습니다.   
하지만 npm, yarn  두가지 모두 새로운 버전을 거듭하면서 서로의 장점을 흡수하여 이제 그 차이는 거의 없다고 해도 무방할 정도입니다.

### 두 패키지 관리자의 문재점

npm, yarn 은 패키지를 설치할때, `node_modules` 라는 디렉토리에 패키지를 설치합니다.   
그런데 하위의 하위에 하위... 패키지가 존재할 경우 각각 `node_modules` 를 가지고 있습니다. 이때 만약 중복되는 패키지가 있다면 용량이 그만큼 배로 늘어나게됩니다.   
이 대안으로 `호이스팅` 을 도입하게 됩니다.

호이스팅은 패키지를 설치할때, 최상위 `node_modules` 에만 설치하고, 하위의 `node_modules` 에는 심볼릭 링크를 걸어주는 방식입니다. 중복된 패키지를 줄임으로써 용량과 탐색 시간을 줄일 수 있게되었습니다.

하지만 이 방식은 `유령 의존성` 이라는 사이드 이펙트를 유발하게 됩니다. 하위 패키지에는 설치한적 없지만 최상위 패키지에는 설치된 패키지가 있을 경우, 하위 패키지에서 해당 패키지를 사용하려고 할때, 심볼릭 링크를 타고 올라가 최상위 패키지의 패키지를 사용하게 됩니다.   
설치하지도 않은 패키지를 사용할 수 있게 되는 것이죠.

그래서 yarn-berry 에서는 이러한 호이스팅 동작이 일어나지 않도록 `nohoist` 라는 옵션이 기본 활성화가 되어있습니다.   
또한 결국 중첩된 패키지 구조에서 각자의 `node_modules` 를탐색하는 I/O 작업을 최적화하는 것은 여전히 숙제로 남아있습니다.   
이 문제를 `yarn-berry` 에서는 `PnP` 라는 방식으로 개선하였습니다.

### Yarn-berry(Yarn2)

yarn-berry 는 2020년 1월에 출시된 yarn 의 새로운 버전입니다.   
이때 부터 yarn1 은 `classic` 이라는 이름으로 불리게 됩니다.

#### 1. Plug'n'Play(PnP)

yarn-berry 에서는 `Plug'n'Play` 라는 방식을 도입하였습니다.   
이 방식은 `node_modules`를 사용하지 않고, 패키지에 대한 정보를 `.zip` 파일로 압축하여 `.yarn/cache` 에 저장하고, `.pnp.js` 파일에 패키지들 간의 의존성 트리를 저장합니다.

이를 `interface linker` 라고 부릅니다. 이렇게 하면 `node_modules` 를 사용하지 않기 때문에, `node_modules` 를 탐색하는 I/O 작업을 최적화할 수 있습니다. 용량도 압축되어 거의 1/3 수준으로 줄어듭니다.

> 여기서 linker 설정을 바꿀 수 있는데, `node-modules` 를 사용하는 `node-modules` linker 와 `PnP` 를 사용하는 `PnP` linker 가 있습니다.

#### 2. Zero-Installs

PnP 전략으로 무거웠던 `node_modules` 를 제거한 할 수 있게 되어, 압축된 의존성 조차 git 에 올려버릴 수 있게 되면서, 매번 의존성을 별도로 설치할 필요가 줄었습니다.   
github 기준으로는 파일당 최대 용량이 500mb 로 제한되지만, yarn-berry 를 통해 압축된 패키지들은 왼만해선 200mb 를 넘지 않습니다.   
이 이점으로 CI/CD 또한 git clone 이 완료된 시점에서, 바로 빌드가 가능하기 때문에 빌드 시간을 단축시킬 수 있습니다.

## Yarn-berry 사용하기

### 1. global yarn 버전 업데이트

> ❗️프로젝트에서 에러가난다면 ~/ 루트 경로로 가서 실행

```bash
yarn set version berry # yarn set version classic -> 되돌리기
```

### 2. init

```bash
touch yarn.lock # 반드시 init 전 yarn.lock 파일이 있어야합니다.
yarn init -2 # 반드시 -2 옵션을 붙여야합니다.
```

### 3. install

```bash
yarn add [package] # yarn add -D [package] -> devDependencies
```

### + .yarnrc.yml

자동으로 생성되는 이 config 파일에서 이것저것 설정해 줄 수 있는데, 대표적으로 하나의 예시만 소개하겠습니다.   
`node-modules` pnp 가 아닌, `node-modules` 를 사용하고 싶다면 아래와 같이 설정해주면 됩니다.

```yml
# ...
nodeLinker: node-modules
```

---

간단히 npm, yarn, yarn-berry 에 대해서 비교하고 yarn-berry 사용법까지 알아보았습니다.   
다음 포스팅에서는 yarn workspace 를 활용하여 모노레포 구성하는 법을 알아보고 나아가서 마이크로 front-end 를 구성하는 법을 알아보겠습니다.