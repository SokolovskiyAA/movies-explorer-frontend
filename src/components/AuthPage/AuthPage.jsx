import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import "./AuthPage.css";

export default function AuthPage({ title, children, text, link, linkText }) {
    return (
        <section className="auth-page">
            <div className="auth-page__container">
                <Link to="/" className="auth-page__logo">
                    <Logo />
                </Link>
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
