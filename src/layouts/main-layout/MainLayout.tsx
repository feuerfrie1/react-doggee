import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@features/theming/hooks/useTheme";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [toggleButton, setToggleButton] = useState(false);

  const toggleButtonHandler = () => {
    setToggleButton(!toggleButton);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="wrapper">
      <div className={styles.content}>
        <div
          className={toggleButton ? `${styles.dark}` : `${styles.light}`}
          onClick={toggleButtonHandler}
        ></div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
