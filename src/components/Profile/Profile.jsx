import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Profile.css";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";

export default function Profile(props) {
    const currentUserData = useContext(CurrentUserContext);

    const { values, errors, setValues, handleChange, isFormValid, setIsFormValid } = useCustomValidation(currentUserData.name, currentUserData.email);
    
    const amountInputs = countInputs(".input");

    useFormValidity(values, errors, amountInputs, setIsFormValid, currentUserData);
    const isDataValid = isFormValid && (currentUserData.name !== values.name || currentUserData.email !== values.email);

    useEffect(() => props.setMessage(""), [props.setMessage]);

    useEffect(() => {
        setValues({
            name: currentUserData.name,
            email: currentUserData.email,
        });
    }, [currentUserData.name, currentUserData.email, setValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        props.handleUpdateUser({
            email: values["email"],
            name: values["name"]
        });
    };

    return (
        <section className="profile">
            <Header
                isLoggedIn={props.isLoggedIn}
                isOpen={props.isOpen}
                onMenuOpen={props.onMenuOpen} />
            <div className="profile__container">
                <h2 className="profile__title">{`Привет, ${currentUserData.name}!`}</h2>
                <form className="profile__form" name="profile" onSubmit={onSubmit}>
                    <fieldset className="profile__inputs">
                        <Input
                            name="name"
                            label="Имя"
                            modifier="profile"
                            type="text"
                            value={values["name"] || ""}
                            error={errors["name"]}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <Input
                            name="email"
                            label="E-mail"
                            modifier="profile"
                            onChange={handleChange}
                            value={values["email"] || ""}
                            error={errors["email"]}
                            type="email"
                            autoComplete="off"
                            required
                        />
                    </fieldset>
                    <p
                        className={`auth-page__message auth-page__message_type_${props.typeMessage}`}
                    >
                        {props.message}
                    </p>
                    <div className="profile__buttons">
                        <Button className={`button_type_profile ${!isDataValid && "button_type_disabled"}`}
                            type="submit"
                        >
                            Редактировать
                        </Button>
                        <Button className="button_type_profile button_type_red-text"
                            handler={props.logoutProfile}>
                            Выйти из аккаунта
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
