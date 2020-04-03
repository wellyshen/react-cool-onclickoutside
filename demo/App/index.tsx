/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import React, { SFC, useRef, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import useOnclickOutside from '../../src';
import {
  root,
  container,
  title,
  subtitle,
  dropdown,
  dropdownBtn,
  dropdownMenu,
  dropdownItem,
} from './styles';

const App: SFC<{}> = () => {
  const ref = useRef<HTMLDivElement>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = (): void => {
    setOpenMenu(false);
  };

  useOnclickOutside(ref, () => {
    closeMenu();
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
        <div css={dropdown} ref={ref}>
          <button css={dropdownBtn} onClick={handleBtnClick} type="button">
            Dropdown button
          </button>
          {openMenu && (
            <div css={dropdownMenu} onClick={closeMenu}>
              <a css={dropdownItem} href="#">
                Action 1
              </a>
              <a css={dropdownItem} href="#">
                Action 2
              </a>
              <a css={dropdownItem} href="#">
                Action 3
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
