import { css } from "@emotion/core";

import mq from "../utils/mq";

const { sm, md, lg } = mq;

export const root = css`
  body {
    font-family: "Open Sans", sans-serif;
  }
`;

export const container = css`
  padding: 5rem 5%;
  text-align: center;
  ${sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

export const title = css`
  margin: 0 0 0.75rem;
`;

export const subtitle = css`
  margin: 0 0 2.5rem;
`;

export const dropdown = css`
  display: inline-block;
  position: relative;
  user-select: none;
`;

export const dropdownBtn = css`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #6c757d;
  line-height: 1.5;
  color: #fff;
  background: #6c757d;
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    border-color: #5a6268;
    background: #5a6268;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
  }
  &::after {
    content: "";
    display: inline-block;
    margin-left: 0.5rem;
    vertical-align: 0.25rem;
    border-top: 0.3rem solid;
    border-right: 0.3rem solid transparent;
    border-bottom: 0;
    border-left: 0.3rem solid transparent;
  }
`;

export const dropdownMenu = css`
  display: inline-block;
  position: absolute;
  left: 0;
  padding: 0.5rem 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  text-align: left;
  transform: translate3d(0, 40px, 0);
  cursor: pointer;
`;

export const dropdownItem = css`
  display: block;
  padding: 0.25rem 1.5rem;
  color: #212529;
  line-height: 1.5;
  text-decoration: none;
  &:hover {
    background: #f8f9fa;
  }
`;
