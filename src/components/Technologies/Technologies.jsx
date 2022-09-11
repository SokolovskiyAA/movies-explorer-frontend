import React from "react";

import "./Technologies.css";
import Title from "../Title/Title";
import { technoList } from "../../utils/constants";
import Button from '../Button/Button';

const Technologies = () => {
    return (
        <section className="technologies" id="technologies">
            <div className="technologies__container">
                <Title title="Технологии" />
                <div className="technologies__text">
                    <h3 className="technologies__text_title">
                        7 технологий
                    </h3>
                    <p className="technologies__text_description">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                </div>
                <ul className="technologies__list">
                    {technoList.map((techno) => (
                        <li className="techno-item">
                            <Button className="techno-item__link">
                                {techno}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
};

export default Technologies;