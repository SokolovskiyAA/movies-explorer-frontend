import React, { useEffect } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";

import "./Register.css";

export default function Register(props) {
  const { values, errors, handleChange, isFormValid, setIsFormValid } = useCustomValidation();

  const amountInputs = countInputs(".input");

  useFormValidity(values, errors, amountInputs, setIsFormValid);

  useEffect(() => props.setMessage(""), [props.setMessage]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values["name"], values["email"], values["password"]);
  };
  return (
    <AuthPage
      title="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
    >
      <form className="register" onSubmit={onSubmit} name="register" noValidate>
        <fieldset className="register__inputs">
          <Input
            name="name"
            label="Имя"
            modifier="unauth"
            type="text"
            value={values["name"] || ""}
            error={errors["name"]}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            label="E-mail"
            modifier="unauth"
            type="email"
            value={values["email"] || ""}
            error={errors["email"]}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            label="Пароль"
            modifier="unauth"
            value={values["password"] || ""}
            error={errors["password"]}
            onChange={handleChange}
            required
            type="password"

          />
        </fieldset>
        <p
          className={`auth-page__message ${props.message ? "auth-page__message_type_fail" : ""
            }`}
        >
          {props.message}
        </p>
        <Button className={`button_type_blue button_type_submit ${!isFormValid && "button_type_disabled"
          }`} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </AuthPage>
  );
}
