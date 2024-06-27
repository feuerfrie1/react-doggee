import React from "react";
import styles from "./CheckBox.module.css";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="happy"
        name="happy"
        value="yes"
        className={styles.custom_checkbox}
        checked={props.checked}
        {...props}
      />
      <label className={styles.checkbox_label} htmlFor="happy">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
