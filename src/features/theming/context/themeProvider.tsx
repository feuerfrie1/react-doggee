import React, { useState } from "react";
import darkTheme from "../../../static/css/themes/dark.module.css";
import lightTheme from "../../../static/css/themes/light.module.css";

import {
  type Theme,
  themeContext,
  type ThemeContextProps,
} from "./themeContext";

type ThemeProviderProps = Omit<ThemeContextProps, "setTheme">;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  // @ts-ignore
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const setTheme = (theme: Theme) => {
    window.localStorage.setItem("doggee-theme", theme);
    setCurrentTheme(theme);
  };

  return (
    <themeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div
        className={
          currentTheme === "dark" ? darkTheme.container : lightTheme.container
        }
      >
        {children}
      </div>
    </themeContext.Provider>
  );
};
