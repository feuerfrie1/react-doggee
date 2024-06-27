import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./FieldRule.module.css";

interface PasswordRuleProps {
  title: string;
  isCorrect: boolean;
  showIcon: boolean;
}

export const FieldRule: React.FC<PasswordRuleProps> = ({
  title,
  isCorrect,
  showIcon,
}) => {
  const ruleClassName = isCorrect
    ? styles.field_rule_incorrect
    : styles.field_rule_correct;
  const iconClassName = isCorrect
    ? styles.icon_correct_rule
    : styles.icon_incorrect_rule;
  return (
    <div className={styles.field_rule_container}>
      {showIcon && (
        <div className={styles.descriptions_icon_container}>
          <div className={iconClassName} />
        </div>
      )}

      <FormattedMessage
        id={title}
        values={{
          rule: (text) => (
            <div className={`${styles.field_rule} ${ruleClassName}`}>
              {text}
            </div>
          ),
        }}
      />
    </div>
  );
};
