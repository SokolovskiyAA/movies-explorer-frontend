import React from "react";
import Button from "../Button/Button";

import "./SearchForm.css";

export default function SearchForm() {
  return (
    <form className="search-form" name="search-movie">
      <div className="search-form__string">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          required
        ></input>
        <Button
          className="button_type_search button_type_blue"
          type="submit"
        >
        </Button>
      </div>
      <label className="search-form__label" htmlFor="short-film">
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
        />
        <div className="search-form__pseudo-item">
          <span className="search-form__circle"></span>
        </div>
        <span className="search-form__label-text">Короткометражки</span>
      </label>
    </form>
  );
}
