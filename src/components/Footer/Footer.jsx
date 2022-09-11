import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoHeader from '../../images/logo.svg';
import './Header.css';
import Button from "../Button/Button";

export default function Header(props) {
    const isLoggedIn = true;
    return (
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
        </footer>
    );
}