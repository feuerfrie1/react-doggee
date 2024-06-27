import React from "react";

import Button from "../../../../../common/buttons/Button/Button";
import Input from "../../../../../common/fields/inputs/Input/Input";
import { RegistrationWizardContainer } from "../../RegistrationWizardContainer/RegistrationWizardContainer";
import { FillProfilePanelData } from "./components/FillProfilePanelData";
import { useFillProfileDataStep } from "./hooks/useFillProfileDataStep";
import { DateInput } from "../../../../../common/fields/inputs/DateInput/DateInput";
import { FormattedMessage } from "react-intl";

import styles from "../../../../RegistrationPage/RegistrationPage.module.css";

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({
  initialData,
  nextStep,
  skipStep,
}) => {
  const [focusedField, setFocuseField] = React.useState<
    "name" | "registrationAddress" | null
  >(null);

  const { state, functions } = useFillProfileDataStep({
    nextStep,
    initialData,
  });
  return (
    <RegistrationWizardContainer
      activeStep={1}
      panel={{
        ...(focusedField && {
          data: <FillProfilePanelData focusedField={focusedField} />,
        }),
        footer: (
          <div role="link" tabIndex={0} aria-hidden onClick={skipStep}>
            <FormattedMessage id="page.registration.skipAndFillInLater" />
          </div>
        ),
      }}
      form={{
        title: (
          <FormattedMessage id="page.registration.step.fillProfileData.title" />
        ),
        content: (
          <form
            className={styles.container__form}
            onSubmit={functions.handleSubmit}
          >
            <div className={styles.container__input}>
              <Input
                value={state.values.name}
                placeholder="What is your name?"
                onFocus={() => setFocuseField("name")}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const username = event.target.value;
                  functions.setFieldValue("name", username);
                }}
                {...(!!state.errors &&
                  !!state.errors.name && {
                    isError: !!state.errors.name,
                    helperText: state.errors.name,
                  })}
              />
            </div>
            <div className={styles.container__input}>
              <Input
                value={state.values.registrationAddress}
                placeholder="Where do you live?"
                onFocus={() => setFocuseField("registrationAddress")}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const password = event.target.value;
                  functions.setFieldValue("registrationAddress", password);
                }}
                {...(!!state.errors &&
                  !!state.errors.registrationAddress && {
                    isError: !!state.errors.registrationAddress,
                    helperText: state.errors.registrationAddress,
                  })}
              />
            </div>
            <div className={styles.container__input}>
              <DateInput
                value={state.values.birthDate}
                onFocus={() => setFocuseField(null)}
                onChange={(date) => {
                  functions.setFieldValue("birthDate", date);
                }}
                {...(!!state.errors &&
                  !!state.errors.birthDate && {
                    isError: !!state.errors.birthDate,
                    helperText: state.errors.birthDate,
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
  );
};
