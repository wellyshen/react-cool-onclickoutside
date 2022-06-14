/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import type { FC } from "react";
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

import GitHubCorner from "../GitHubCorner";
import styles from "./styles.module.scss";

const App: FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleBtnClick = () => setOpenMenu(!openMenu);

  const closeMenu = () => setOpenMenu(false);

  const ref = useOnclickOutside(() => closeMenu());

  return (
    <div className={styles.container}>
      <GitHubCorner url="https://github.com/wellyshen/react-cool-onclickoutside" />
      <h1 className={styles.title}>REACT COOL ONCLICKOUTSIDE</h1>
      <p className={styles.subtitle}>
        React hook to listen for clicks outside of the component(s).
      </p>
      <div className={styles.dropdown} ref={ref}>
        <button
          className={styles["dropdown-btn"]}
          onClick={handleBtnClick}
          type="button"
        >
          DROPDOWN BUTTON
        </button>
        {openMenu && (
          <div className={styles["dropdown-menu"]} onClick={closeMenu}>
            <a className={styles["dropdown-item"]} href="#">
              ACTION 1
            </a>
            <a className={styles["dropdown-item"]} href="#">
              ACTION 2
            </a>
            <a className={styles["dropdown-item"]} href="#">
              ACTION 3
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
