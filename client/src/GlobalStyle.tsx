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
  
`;

export default GlobalStyle;
