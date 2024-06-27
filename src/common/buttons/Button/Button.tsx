import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  ...props
}) => (
  <button className={styles.button} {...props}>
    {!isLoading && children}
    {isLoading && <div className={styles["dot-flashing"]} />}
  </button>
);

export default Button;
