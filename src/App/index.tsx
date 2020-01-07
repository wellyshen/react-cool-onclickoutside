import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import useOnclickoutside from '../useOnclickoutside';
import { root, container, title, subtitle, menu } from './styles';

const App: SFC<{}> = () => {
  const setRef = useOnclickoutside(e => {
    console.log('LOG ===> ', e);
  });

  return (
    <>
      <Global
        styles={css`
          ${normalize}
          ${root}
        `}
      />
      <div css={container}>
        <GitHubCorner url="https://github.com/wellyshen/react-cool-onclickoutside" />
        <h1 css={title}>React Cool Onclickoutside</h1>
        <p css={subtitle}>
          React hook to listen for clicks outside of the component(s).
        </p>
        <div css={menu} ref={setRef}>
          Menu 1
        </div>
        <div css={menu} ref={setRef}>
          Menu 2
        </div>
      </div>
    </>
  );
};

export default App;
