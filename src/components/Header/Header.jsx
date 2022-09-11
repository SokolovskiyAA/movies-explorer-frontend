import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoHeader from '../../images/logo.svg';
import './Header.css';
import Button from "../Button/Button";

export default function Header(props) {
    const isLoggedIn = true;
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="Логотип" />
            <div className="header-container">
                <nav className={`header-navigation__links`}>
                    <NavLink
                        className={`header-navigation__link ${isLoggedIn ? "" : "header-navigation__links_type_hidden"}`}
                        to="/movies"
                        activeClassName="header-navigation__link_activ">
                        Фильмы
                    </NavLink>
                    <NavLink className={`header-navigation__link ${isLoggedIn ? "" : "header-navigation__links_type_hidden"}`} // TODO Props
                        to="/saved-movies">
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                <div className="header__account-menu">
                    <Link className="button_type_header"
                        to="/signup">
                        Регистрация
                    </Link>
                    <>
                        <Link to="/signin">
                            <Button className="button_type_header button_type_header_green">
                                Войти
                            </Button>
                        </Link>
                    </>

                </div>
            </div>

        </header>
    );
}