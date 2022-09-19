import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Button from "../Button/Button";
import Sidebar from "../Sidebar/Sidebar";
import AccountButton from '../AccountButton/AccountButton';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';

export default function Header(props) {

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <Logo />
            </Link>

            {props.isLoggedIn ? (
                <div className="header-container header-container_type_auth">
                    <nav className={"header-navigation__links"}>
                        <NavLink
                            className={`header-navigation__link ${props.isLoggedIn ? "" : "header-navigation__links_type_hidden"}`}
                            to="/movies"
                            activeClassName="header-navigation__link_activ">
                            Фильмы
                        </NavLink>
                        <NavLink className={`header-navigation__link ${props.isLoggedIn ? "" : "header-navigation__links_type_hidden"}`}
                            to="/saved-movies">
                            Сохранённые фильмы
                        </NavLink>
                    </nav>
                    <Link to="/profile" className="header-navigation__link">
                        <AccountButton />
                    </Link>
                </div>
            ) : (
                <div className="header-container header-container_type_unauth">
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
            )}
            {props.isLoggedIn && (
                <Burger
                    onMenuOpen={props.onMenuOpen}
                    isOpen={props.isOpen}
                />
            )}
            <Sidebar isOpen={props.isOpen} onMenuOpen={props.onMenuOpen} />
        </header>
    );
}