import React, { useRef } from "react";
import styles from "./LoginPage.module.css";
import Input from "../../common/fields/inputs/Input/Input";
import Button from "../../common/buttons/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import CheckBox from "../../common/fields/checkboxes/CheckBox/CheckBox";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../redux/slices/user";
import { useForm } from "../../utils/helpers/hooks/form/useForm";
import { PasswordInput } from "../../common/fields/inputs/PasswordInput/PasswordInput";
import { FormattedMessage } from "react-intl";

const validateIsEmpty = (value: string) => {
  if (!value) return "field required";
  return null;
};

const validateMail = (value: string) => validateIsEmpty(value);
const validatePassword = (value: string) => validateIsEmpty(value);

const loginFormValidateSchema = {
  email: validateMail,
  password: validatePassword,
};

interface LoginFormValues {
  email: string;
  password: string;
  notMyComputer: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, setFieldValue, handleSubmit } =
    useForm<LoginFormValues>({
      initialValues: { email: "", password: "", notMyComputer: false },
      validateSchema: loginFormValidateSchema,
      validateOnChange: true,
      onSubmit: async (values) => {
        // @ts-ignore
        const response = await dispatch(fetchAuth(values));
        if (!response.payload) {
          return alert("Не удалось авторизоваться");
        }
        // @ts-ignore
        if ("token" in response.payload) {
          // @ts-ignore
          window.localStorage.setItem("doggee-auth", response.payload.token);
        }
        navigate("/main");
      },
    });

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__header}>
          <p className={styles.container__header_label}>DOGGEE</p>
        </div>
        <form className={styles.container__form} onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            value={values.email}
            type="email"
            placeholder="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const email = event.target.value;
              setFieldValue("email", email);
            }}
            {...(!!errors &&
              !!errors.email && {
                isError: !!errors.email,
                helperText: errors.email,
              })}
          />
          <PasswordInput
            value={values.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const password = event.target.value;
              setFieldValue("password", password);
            }}
            {...(!!errors &&
              !!errors.password && {
                isError: !!errors.password,
                helperText: errors.password,
              })}
          />
          <CheckBox
            checked={values.notMyComputer}
            label="This is not my device"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const notMyComputer = event.target.checked;
              setFieldValue("notMyComputer", notMyComputer);
            }}
          />
          <Button type="submit">
            <FormattedMessage id="button.signIn"></FormattedMessage>
          </Button>
        </form>
        <Link to="/registration">
          <p className={styles.container__signup}>
            <FormattedMessage id="page.login.createNewAccont"></FormattedMessage>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
