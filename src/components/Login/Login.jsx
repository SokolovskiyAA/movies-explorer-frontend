import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";

import "./Login.css";

export default function Login() {
    return (
        <AuthPage
            title="Рады видеть!"
            text="Ещё не зарегистрированы?"
            link="/signup"
            linkText="Регистрация"
        >
            <form className="login" name="login">
                <fieldset className="login__inputs">
                    <Input
                        name="email"
                        label="E-mail"
                        modifier="auth"
                        type="email"
                        required
                    />
                    <Input
                        name="password"
                        label="Пароль"
                        error="Что-то пошло не так..."
                        modifier="auth"
                        required
                        type="password"
                    />
                </fieldset>
                <Button className="button_type_blue button_type_submit" type="submit">
                    Войти
                </Button>
            </form>
        </AuthPage>
    );
}
