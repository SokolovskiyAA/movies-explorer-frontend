import React, { useState, useEffect } from "react";

import Button from "../Button/Button";
import "./MoviesCard.css";

import {
  SERVER_URL,
  UNKNOWN_IMAGE_URL,
  UNKNOWN_TRAILER_URL,
  UNKNOWN_CARD_TEXT,
} from "../../utils/constants";

export default function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (props.savedMovies.some((movie) => movie.movieId === props.card.id)) {
      setIsSaved(true);
    }
  }, [props.savedMovies, props.card.id]);

  function handleSave() {
    const movieData = {
      country: props.card.country || UNKNOWN_CARD_TEXT,
      director: props.card.director || UNKNOWN_CARD_TEXT,
      duration: props.card.duration,
      year: props.card.year || UNKNOWN_CARD_TEXT,
      description: props.card.description || UNKNOWN_CARD_TEXT,
      image: SERVER_URL + props.card.image.url || UNKNOWN_IMAGE_URL,
      trailerLink: props.card.trailerLink || UNKNOWN_TRAILER_URL,
      nameRU: props.card.nameRU || props.card.nameEN || UNKNOWN_CARD_TEXT,
      nameEN: props.card.nameEN || props.card.nameRU || UNKNOWN_CARD_TEXT,
      thumbnail: SERVER_URL + props.card.image.formats.thumbnail.url || UNKNOWN_IMAGE_URL,
      movieId: props.card.id,
    };
    props.onSaveHandler(movieData, setIsSaved);
  }

  function handleDelete() {
    props.onDeleteHandler(props.card.id || props.card.movieId, setIsSaved);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.card.nameRU}</h2>
          <p className="movies-card__duration">{props.card.duration}м</p>
        </div>
        <Button
          className={`button_type_card ${isSaved && props.moviesPage ? "button-card__clik_like" :
            !props.moviesPage ? "button-card__clik_delete" : "button-card__clik_dislike"}`}
          handler={!isSaved && props.moviesPage ? handleSave : handleDelete}
        >
        </Button>
      </div>
      <a href={props.card.trailerLink} className="movies-card__link" target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={props.moviesPage ? SERVER_URL + props.card.image.url : props.card.image} alt={props.card.title} />
      </a>
    </li >
  );
}
