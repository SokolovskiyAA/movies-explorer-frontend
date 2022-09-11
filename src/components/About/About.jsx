import React from "react";

import "./About.css";
import Title from "../Title/Title";

const About = () => {
    return (
        <section className="about" id="about">
            <Title title="О проекте" />
            <div className="about__cards">
                <div className="text-card">
                    <h3 className="text-card__title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="text-card__description">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="text-card">
                    <h3 className="text-card__title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="text-card__description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about__roadmap">
                <div className="roadmap__backend">
                    <p className="roadmap__time roadmap__time_type_colored">1 неделя</p>
                    <p className="roadmap__title">Back-end</p>
                </div>
                <div className="roadmap__frontend">
                    <p className="roadmap__time">4 недели</p>
                    <p className="roadmap__title">Front-end</p>
                </div>
            </div>
        </section>
    );
};

export default About;