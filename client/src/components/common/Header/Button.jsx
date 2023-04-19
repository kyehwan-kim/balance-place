import React from "react";
import styled from "styled-components";

const MyButton = styled.a`
  display: inline-block;
  text-decoration: none;
  font-size: 1.4em;
  padding: 0.6em 1.1em;
  background-color: #000;
  color: #fff;
  border-radius: 0.7em;
  user-select: none;
  &:hover {
  }
`;
export default function Button({ text }) {
  return <MyButton>{text}</MyButton>;
}
