import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,html{
    background-color: #121212;
    font-family: 'Noto Sans KR', sans-serif;
  }

  & a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  blockquote {
    color: #666;
    margin: 0;
    padding-left: 3em;
    border-left: 0.5em #815cf0 solid;
  }

  table,
  tr,
  td,
  th {
    border: 1px solid #555;
    border-collapse: collapse;
    padding: .5em 1em;
  }
  
`;

export default GlobalStyle;
