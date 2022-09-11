import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Main.css';
import Button from '../Button/Button';
import Title from '../Title/Title';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';

export default function Main(props) {
    const isLoggedIn = true;
    return (
        <main className='main'>
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
            <About />
            <Technologies />
            <Student />
        </main>
    );
}