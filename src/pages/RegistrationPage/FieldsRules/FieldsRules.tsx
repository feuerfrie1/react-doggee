import React from "react";
import { FormattedMessage } from "react-intl";

import { FieldRule } from "./FieldRule/FieldRule";

import styles from "./FieldsRules.module.css";

interface PasswordRulesProps {
  rules: {
    title: string;
    isCorrect: boolean;
  }[];
  hasPasswordErrors: boolean;
}

export const FieldsRules: React.FC<PasswordRulesProps> = ({
  rules,
  hasPasswordErrors,
}) => (
  <div className={styles.panel__descriptions}>
    <FormattedMessage id="page.registration.step.fillLoginDataStep.passwordRules.must" />

    {rules.slice(0, -1).map(({ title, isCorrect }, index) => (
      <FieldRule
        key={index}
        title={title}
        isCorrect={isCorrect}
        showIcon={isCorrect || hasPasswordErrors}
      />
    ))}

    <FieldRule
      showIcon={rules[rules.length - 1].isCorrect || hasPasswordErrors}
      title="page.registration.step.fillLoginDataStep.passwordRules.mustMatch"
      isCorrect={rules[rules.length - 1].isCorrect}
    />
  </div>
);
