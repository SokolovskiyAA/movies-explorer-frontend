import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

import "./Register.css";

export default function Register() {
  return (
    <AuthPage
      title="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
    >
      <form className="register" name="register">
        <fieldset className="register__inputs">
          <Input
            name="name"
            label="Имя"
            modifier="unauth"
            type="text"
            required
          />
          <Input
            name="email"
            label="E-mail"
            modifier="unauth"
            type="email"
            required
          />
          <Input
            name="password"
            label="Пароль"
            error="Что-то пошло не так..."
            modifier="unauth"
            required
            type="password"
          />
        </fieldset>
        <Button className="button_type_blue button_type_submit" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </AuthPage>
  );
}
