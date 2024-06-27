import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../common/buttons/Button/Button";
import Input from "../../../../../common/fields/inputs/Input/Input";
import { PasswordInput } from "../../../../../common/fields/inputs/PasswordInput/PasswordInput";
import { FieldsRules } from "../../../FieldsRules/FieldsRules";
import { RegistrationWizardContainer } from "../../RegistrationWizardContainer/RegistrationWizardContainer";
import { useFillLoginDataStep } from "./hooks/useFillLoginDataStep";
import { FormattedMessage } from "react-intl";

import styles from "../../../RegistrationPage.module.css";

export interface RegistrationFormValues {
  email: string;
  password: string;
  passwordAgain: string;
}

interface FillLoginDataStepProps {
  nextStep: () => void;
}

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({
  nextStep,
}) => {
  const navigate = useNavigate();
  const { state, functions } = useFillLoginDataStep({
    nextStep,
  });

  return (
    <>
      <RegistrationWizardContainer
        panel={{
          data: (
            <FieldsRules
              rules={state.rules}
              hasPasswordErrors={!!state.errors?.password}
            />
          ),
          footer: (
            <div
              role="link"
              tabIndex={0}
              aria-hidden
              onClick={() => navigate("/auth")}
            >
              <FormattedMessage id="page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount" />
            </div>
          ),
        }}
        form={{
          title: (
            <FormattedMessage id="page.registration.step.fillLoginDataStep.title" />
          ),
          content: (
            <form
              className={styles.container__form}
              onSubmit={functions.handleSubmit}
            >
              <div className={styles.container__input}>
                <Input
                  value={state.values.email}
                  type="email"
                  placeholder="email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const email = event.target.value;
                    functions.setFieldValue("email", email);
                  }}
                  {...(!!state.errors &&
                    !!state.errors.email && {
                      isError: !!state.errors.email,
                      helperText: state.errors.email,
                    })}
                />
              </div>
              <div className={styles.container__input}>
                <PasswordInput
                  value={state.values.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const password = event.target.value;
                    functions.setFieldValue("password", password);
                  }}
                  {...(!!state.errors &&
                    !!state.errors.password && {
                      isError: !!state.errors.password,
                      helperText: state.errors.password,
                    })}
                />
              </div>
              <div className={styles.container__input}>
                <PasswordInput
                  value={state.values.passwordAgain}
                  placeholder="password again"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const passwordAgain = event.target.value;
                    functions.setFieldValue("passwordAgain", passwordAgain);
                  }}
                  {...(!!state.errors &&
                    !!state.errors.passwordAgain && {
                      isError: !!state.errors.passwordAgain,
                      helperText: state.errors.passwordAgain,
                    })}
                />
              </div>
              <Button type="submit">
                <FormattedMessage id="button.done" />
              </Button>
            </form>
          ),
        }}
      />
    </>
  );
};
