# NextJS 13 보일러 플레이트

> nextjs 를 사용하게되면 거의 반 필수적으로 사용하는 패키지들을 미리 설치해놓은 보일러 플레이트 입니다.

## 목록

- 스타일 : `@emotion/react`, `@emotion/styled`
- 상태관리 : `zustand`, `immer`, `redux-devtools`
- fetch : `react-query`, `react-query-devtools`, `axios`
- svg : `svgr`
- 에디터 : `eslint`, `prettier`

## 마크다운 커스텀 렌더링 옵션

### 이미지

- 쿼리로 `width`, `height`, `align` 옵션을 줄 수 있습니다.
- `align` 옵션은 기본이 `center`, `left(=start)`, `right(=end)` 입니다.
- `width`, `height` 옵션은 기본은 '`unset`', `max-width` 는 `100%`.

```md
![Github_Logo](/svg/home.svg?width=300&height=300&align=end)
```
