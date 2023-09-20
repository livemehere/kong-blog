# Next.js Blog

> ❗️직접 만들어 짧은 기간 운영하던 블로그 입니다. 결국 글쓰는 접근성이 티스토리가 더 편해서, 다시 옮기기게 되어 폐기된 프로젝트 입니다.

## Stack

- 스타일 : `@emotion/react`, `@emotion/styled`
- 상태관리 : `zustand`, `immer`, `redux-devtools`
- fetch : `react-query`, `react-query-devtools`, `axios`
- svg : `svgr`
- 에디터 : `eslint`, `prettier`

## 마크다운 커스텀 렌더링 옵션

### 템플릿 예시

- `category` 와 `tags`, `thumbnailUrl` 을 메타정보로 입력할 수 있습니다.
- 생성일,수정일은 파일자체의 메타 데이터를 사용합니다.
- category : string (default : '지정되지 않음')
- tags : string[] (default : [])
- thumbnailUrl : public 경로 (default : undefined) 설정하지 않으면 로고로 생성됩니다.

```md
---
category: 'hello'
tags: ['blog','test']
thumbnailUrl: '/images/thumbnail.png'
---

# hello

## hello
```

### 이미지

- 쿼리로 `width`, `height`, `align` 옵션을 줄 수 있습니다.
- `align` 옵션은 기본이 `center`, `left(=start)`, `right(=end)` 입니다.
- `width`, `height` 옵션은 기본은 '`unset`', `max-width` 는 `100%`.

```md
![Github_Logo](/svg/home.svg?width=300&height=300&align=end)
```
