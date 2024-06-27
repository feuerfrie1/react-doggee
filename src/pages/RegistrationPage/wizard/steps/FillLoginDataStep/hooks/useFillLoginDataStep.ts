import React from "react";

import { validateIsEmpty } from "../../../../../../utils/helpers/validations/validateIsEmpty";
import { useForm } from "../../../../../../utils/helpers/hooks/form/useForm";
import { fetchRegister } from "../../../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { validateContainNumbers } from "../../../../../../utils/helpers/validations/validateContainNumbers";
import { validateContainUpperCase } from "../../../../../../utils/helpers/validations/validateContainUpperCase";
import { validateContainLowerCase } from "../../../../../../utils/helpers/validations/validateContainLowerCase";

const fillLoginDataStepValidateSchema = {
  email: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value),
  passwordAgain: (value: string) => validateIsEmpty(value),
};

export const getPasswordRules = (
  password: FillLoginDataStepValues["password"],
  passwordAgain: FillLoginDataStepValues["passwordAgain"]
) => [
  {
    title:
      "page.registration.step.fillLoginDataStep.passwordRules.containNumbers",
    isCorrect: !validateContainNumbers(password),
  },
  {
    title:
      "page.registration.step.fillLoginDataStep.passwordRules.containUppercase",
    isCorrect: !validateContainUpperCase(password),
  },
  {
    title:
      "page.registration.step.fillLoginDataStep.passwordRules.containLowerCase",
    isCorrect: !validateContainLowerCase(password),
  },
  {
    title:
      "page.registration.step.fillLoginDataStep.passwordRules.contain8Characters",
    isCorrect: password.length >= 8,
  },
  {
    title: "page.registration.step.fillLoginDataStep.passwordRules.mustMatch",
    isCorrect: !!password && !!passwordAgain && password === passwordAgain,
  },
];

type UseFillLoginDataStepParams = FillLoginDataStepProps;

export const useFillLoginDataStep = ({
  nextStep,
}: UseFillLoginDataStepParams) => {
  const dispatch = useDispatch();
  const { values, errors, setFieldValue, handleSubmit, setIsSubmiting } =
    useForm<FillLoginDataStepValues>({
      initialValues: { email: "", password: "", passwordAgain: "" },
      validateSchema: fillLoginDataStepValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        const passwordRules = getPasswordRules(
          values.password,
          values.passwordAgain
        );
        const isPasswordUnCorrect = passwordRules.some(
          (rule) => rule.isCorrect === false
        );
        if (isPasswordUnCorrect) return;
        // @ts-ignore
        const data: any = await dispatch(fetchRegister(values));
        if ("token" in data.payload) {
          window.localStorage.setItem("doggee-auth", data.payload.token);
        }
        nextStep();
        setIsSubmiting(false);
      },
    });
  const rules = React.useMemo(
    () => getPasswordRules(values.password, values.passwordAgain),
    [values.password, values.passwordAgain]
  );

  return {
    state: {
      values,
      errors,
      rules,
    },
    functions: {
      setFieldValue,
      handleSubmit,
    },
  };
};
