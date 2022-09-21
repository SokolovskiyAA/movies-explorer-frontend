import React from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../../images/logo.svg';
import "./AuthPage.css";

export default function AuthPage({ title, children, text, link, linkText }) {
    return (
        <section className="auth-page">
            <div className="auth-page__container">
                <img className="auth-page__logo" src={logoHeader} alt="Логотип" />
                <h2 className="auth-page__title">{title}</h2>
                {children}
                <p className="auth-page__text">
                    {text}
                    <Link className="auth-page__link" to={link}>
                        {linkText}
                    </Link>
                </p>
            </div>
        </section>
    );
}
