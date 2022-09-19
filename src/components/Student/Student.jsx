import React from "react";

import "./Student.css";
import Title from "../Title/Title";
import foto from '../../images/student-foto.svg';
import { projects } from "../../utils/constants";
import linkIcon from "../../images/link_portfolio.svg";

const Student = () => {
    return (
        <section className="student" id="student">
            <Title title="Студент" />
            <div className="student__info">
                <div className="student__info_about-me">
                    <h3 className="about-me__title">
                        Андрей
                    </h3>
                    <p className="about-me__about">
                        Фронтенд-разработчик, 31 год
                    </p>
                    <p className="about-me__description">
                        Я родился и живу в Пушкино, закончил факультет информатики и вычислительной техники. У меня есть жена
                        и два сына. Я люблю слушать музыку, а ещё увлекаюсь готовкой на гриле.
                    </p>
                    <a className="about-me__link" href="https://github.com/SokolovskiyAA">
                        Guthub
                    </a>
                </div>
                <img className="student__info_foto" src={foto} alt="Фото" />
            </div>
            <div className="portfolio">
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className="portfolio__projects">
                    {projects.map((project) => (
                        <li key={project.id} className="project">
                            <a href={project.url} className="project__link" target="_blank" rel="noreferrer">
                                {project.title}
                                <img className="project__link_icon" src={linkIcon} alt="Иконка ссылки"/>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Student;