# 개인 블로그 프로젝트

## key point

- `require()` 활용
  - `build` 타임에만 알수있기 때문에, 동적으로 사용 불가(변수에 담았다가 사용할 수 가없음, `template literal` 로 동적 사용은 가능)
- `fetch()` 활용
- react-markdown
- styled-components

## 게시글 많아지면

- 필터링(검색) debounce 적용
- 무한 스클로 적용

## 게시글을 추가하려면

1. `src/markdown` 에 md파일 추가
2. `public/thumbnails` 에 썸네일 사진 추가
3. `src/markdown/list.json` 에 md파일이름 & 썸네일 사진 이름 추가 작성