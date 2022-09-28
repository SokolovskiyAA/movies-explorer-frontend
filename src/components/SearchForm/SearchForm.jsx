import React, { useEffect } from "react";
import Button from "../Button/Button";

import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";

import "./SearchForm.css";
import { useState } from "react";

export default function SearchForm(props) {
  const [errorText, setErrorText] = useState("");
  const { values, errors, setValues, handleChange, isFormValid, setIsFormValid } = useCustomValidation();
  const amountInputs = countInputs(".search-form__input");

  useFormValidity(values, errors, amountInputs, setIsFormValid);

  useEffect(() => {
    if (props.lastQuery) {
      setValues({ ...values, "film-query": props.lastQuery });
    }
  }, [props.lastQuery, setValues]);


  const onSubmit = (e) => {
    e.preventDefault();
    if (values["film-query"] === undefined) {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    if (isFormValid) {
      props.onSubmit(props.isCheckBox, values["film-query"]);
      setErrorText("");
      return;
    }
    setErrorText(errors["film-query"]);
  };

  const onClickCheckBox = () => props.setIsCheckBox(!props.isCheckBox);

  return (
    <form className="search-form" name="search-movie" onSubmit={onSubmit} noValidate>
      <div className="search-form__string">
        <input
          className="search-form__input"
          placeholder="Фильм"
          name="film-query"
          type="text"
          onChange={handleChange}
          value={values["film-query"] || ""}
          autoComplete="off"
          required
        ></input>
        <Button
          className="button_type_search button_type_blue"
          type="submit"
        >
        </Button>
      </div>
      <span className="search-form__error">{errorText}</span>
      <label className="search-form__label" htmlFor="short-film">
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
          checked={props.isCheckBox}
          onChange={onClickCheckBox}
        />
        <div className="search-form__pseudo-item">
          <span className="search-form__circle"></span>
        </div>
        <span className="search-form__label-text">Короткометражки</span>
      </label>
    </form>
  );
}
