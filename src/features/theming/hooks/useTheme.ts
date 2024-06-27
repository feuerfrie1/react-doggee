import React from "react";
import { themeContext } from "../context/themeContext";

export const useTheme = () => React.useContext(themeContext);
