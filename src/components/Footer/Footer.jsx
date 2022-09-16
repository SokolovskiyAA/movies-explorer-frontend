import React from 'react';
import './Footer.css';
import { footerLinks } from '../../utils/constants';

export default function Footer(props) {
    const isLoggedIn = true;
    return (
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
                <p className="footer__year">&#169; 2022</p>
                <ul className="footer__links">
                    {footerLinks.map((link) => (
                        <li className="footer__link">
                            <a className="link" href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}