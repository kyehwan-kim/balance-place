import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif !important;
  src:url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable.css");
}

  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif !important;
    text-align: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  a {
  text-decoration: none;
}
`;

export default GlobalStyle;
