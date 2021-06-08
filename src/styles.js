import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: '#f6f6f6',
  fontColor: '#1c2023',
  mainColor: '#F16489',
  borderColor: '#888888',
  formColor: '#fff',
};
export const darkTheme = {
  bgColor: '#1c2023',
  fontColor: '#FFF',
  mainColor: '#F16489',
  borderColor: '#888888',
  formColor: '#343a40',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
  }
  * {
    box-sizing: border-box;
  }
  body {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Nanum Gothic', sans-serif;
  }
  a {
    text-decoration: none;
  }
  button {
    font-family: 'Nanum Gothic', sans-serif;
  }
`;
