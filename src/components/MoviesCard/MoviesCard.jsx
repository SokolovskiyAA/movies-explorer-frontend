import React, { useState, useContext } from "react";

import Button from "../Button/Button";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import "./MoviesCard.css";

export default function MoviesCard(props) {
  const { onSavedPage } = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => setIsSaved(!isSaved);
  const handleDelete = () => console.log("Удаление карточки");

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.card.title}</h2>
          <p className="movies-card__duration">{props.card.duration}м</p>
        </div>
        <Button
          className={`button_type_card ${isSaved && !onSavedPage ? "button-card__clik_like" :
              onSavedPage ? "button-card__clik_delete" : "button-card__clik_dislike"}`}
          handler={!onSavedPage ? handleSave : handleDelete}
        >
        </Button>
      </div>
      <img className="movies-card__image" src={props.card.imageUrl} alt={props.card.title} />
    </li >
  );
}
