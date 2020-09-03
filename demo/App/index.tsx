/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import React, { FC, useState } from "react";
import { Global, css } from "@emotion/core";
import normalize from "normalize.css";

import GitHubCorner from "../GitHubCorner";
import useOnclickOutside from "../../src";
import {
  root,
  container,
  title,
  subtitle,
  dropdown,
  dropdownBtn,
  dropdownMenu,
  dropdownItem,
} from "./styles";

const App: FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const ref = useOnclickOutside(() => {
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
        <h1 css={title}>REACT COOL ONCLICKOUTSIDE</h1>
        <p css={subtitle}>
          React hook to listen for clicks outside of the component(s).
        </p>
        <div css={dropdown} ref={ref}>
          <button css={dropdownBtn} onClick={handleBtnClick} type="button">
            DROPDOWN BUTTON
          </button>
          {openMenu && (
            <div css={dropdownMenu} onClick={closeMenu}>
              <a css={dropdownItem} href="#">
                ACTION 1
              </a>
              <a css={dropdownItem} href="#">
                ACTION 2
              </a>
              <a css={dropdownItem} href="#">
                ACTION 3
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
