import React, { useContext, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

export default function Movies(props) {
    // console.log(props.isLoading);
    const { onSavedPage, setOnSavedPage } = useContext(CurrentUserContext);
    useEffect(() => setOnSavedPage(false), [setOnSavedPage]);

    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                isOpen={props.isOpen}
                onMenuOpen={props.onMenuOpen} />
            <main className="movies movies-page__movies" aria-label="Фильмы">
                <SearchForm />
                {props.isLoading && <Preloader />}
                <MoviesCardList movies={props.movies} />
                {!onSavedPage && (
                    <div className="movies__add">
                    <Button className="button_type_more">Ещё</Button>
                </div>
                )}
                
            </main>
            <Footer />
        </>
    );
}
