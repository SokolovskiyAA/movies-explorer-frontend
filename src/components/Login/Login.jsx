import React, { useEffect } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";

import "./Login.css";

export default function Login(props) {
    const { values, errors, handleChange, isFormValid, setIsFormValid } = useCustomValidation();

    const amountInputs = countInputs(".input");

    useFormValidity(values, errors, amountInputs, setIsFormValid);

    useEffect(() => props.setMessage(""), [props.setMessage]);

    const onSubmit = (e) => {
        e.preventDefault();
        props.onLogin(values["email"], values["password"]);
    };
    return (
        <AuthPage
            title="Рады видеть!"
            text="Ещё не зарегистрированы?"
            link="/signup"
            linkText="Регистрация"
        >
            <form className="login" name="login" onSubmit={onSubmit}>
                <fieldset className="login__inputs">
                    <Input
                        name="email"
                        label="E-mail"
                        modifier="auth"
                        type="email"
                        value={values["email"] || ""}
                        error={errors["email"]}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="password"
                        label="Пароль"
                        value={values["password"] || ""}
                        error={errors["password"]}
                        onChange={handleChange}
                        modifier="auth"
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
                    Войти
                </Button>
            </form>
        </AuthPage>
    );
}
