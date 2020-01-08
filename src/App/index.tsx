/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { SFC, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import useOnclickoutside from '../useOnclickoutside';
import { root, container, title, subtitle, menu } from './styles';

const App: SFC<{}> = () => {
  const [txt1, setTxt1] = useState('Target area 1');
  const [txt2, setTxt2] = useState('Target area 2');
  const setRef = useOnclickoutside(
    () => {
      setTxt1('Clicked outside');
      setTxt2('Clicked outside');
    },
    { excludeScrollbar: true }
  );

  const handleArea1 = (): void => {
    setTxt1('Clicked target area 1');
  };

  const handleArea2 = (): void => {
    setTxt2('Clicked target area 2');
  };

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
        <div css={menu} onClick={handleArea1} ref={setRef}>
          {txt1}
        </div>
        <div css={menu} onClick={handleArea2} ref={setRef}>
          {txt2}
        </div>
      </div>
    </>
  );
};

export default App;
