import React from "react";

export type Theme = "light" | "dark";

export interface ThemeContextProps {
  theme: Theme;
  children?: any;
  setTheme: (theme: Theme) => void;
}

export const themeContext = React.createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});
