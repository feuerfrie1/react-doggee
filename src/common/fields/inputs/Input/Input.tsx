import React, { forwardRef, useRef, useState } from "react";
import { classnames } from "../../../../utils/helpers/classnames/classnames";
import styles from "../Input/Input.module.css";

export interface InputProps extends FieldProps {
  components?: {
    indicator?: () => React.ReactElement;
  };
}

export interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  loading?: boolean;
  isError?: boolean;
  helperText?: string;
  availableChars?: RegExp;
  placeholder?: any;
}

export const MAX_LENGHT = {
  DATE: 10,
};

const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  availableChars,
  components,
  ...props
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        aria-disabled={props.disabled}
        className={classnames(styles.field_container, {
          [styles.input_error]: isError,
        })}
        onClick={() => inputRef.current?.focus()}
      >
        {components?.indicator && (
          <div className={styles.indicator_container}>
            <components.indicator />
          </div>
        )}
        <input
          ref={inputRef}
          className={styles.input}
          onChange={(e) => {
            if (!!onChange && !e.target.value) return onChange(e);
            if (
              !onChange ||
              (availableChars && !availableChars.test(e.target.value))
            )
              // @ts-ignore
              return onChange({
                ...e,
                // @ts-ignore
                target: { ...e.target, value: props.value },
              });
            onChange(e);
          }}
          {...props}
        />
      </div>
      {isError && helperText && (
        <div className={styles.input_helper_text}>{helperText}</div>
      )}
    </>
  );
};

export default Input;
