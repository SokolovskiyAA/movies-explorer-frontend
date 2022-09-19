import React from "react";

import "./Promo.css";
import Button from '../Button/Button';

export default function Promo() {
    return (
        <section className="main__promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <nav className="promo-navigation">
                <a href='#about'>
                    <Button className="promo-navigation__link">
                        О проекте
                    </Button>
                </a>
                <a href='#technologies'>
                    <Button className="promo-navigation__link">
                        Технологии
                    </Button>
                </a>
                <a href='#student'>
                    <Button className="promo-navigation__link">
                        Студент
                    </Button>
                </a>
            </nav>
        </section>
    );
};
