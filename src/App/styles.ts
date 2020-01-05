import { css, keyframes } from '@emotion/core';

const mq = {
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)'
};

export const root = css`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export const container = css`
  padding: 5rem 5%;
  text-align: center;
  ${mq.sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${mq.md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${mq.lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const octocatWave = keyframes`
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
`;

export const octo = css`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  fill: #151513;
  color: #fff;
`;

export const octoArm = css`
  transform-origin: 130px 106px;
  animation: ${octocatWave} 560ms ease-in-out;
  ${mq.sm} {
    animation: none;
  }
`;

export const github = css`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    .css-${octoArm.name} {
      animation: none;
      ${mq.sm} {
        animation: ${octocatWave} 560ms ease-in-out;
      }
    }
  }
`;

export const title = css`
  margin: 0 0 0.75rem;
`;

export const subtitle = css`
  margin: 0 0 2.5rem;
`;
