import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 60px;
  font-size: 18px;
  text-align: center;
  border: none;
  color: white;
  background-color: ${(props) => props.theme.mainColor};
  cursor: ${(props) => (props.disabled ? null : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
`;
