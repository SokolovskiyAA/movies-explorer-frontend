import React, { useContext, useEffect } from "react";
import Movies from '../Movies/Movies';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function SavedMovies(props) {
    const { setOnSavedPage } = useContext(CurrentUserContext);
    useEffect(() => setOnSavedPage(true), [setOnSavedPage]);
    return (
        <Movies
            movies={props.savedMovies} 
            isLoggedIn={props.isLoggedIn}
            isOpen={props.isOpen}
            onMenuOpen={props.onMenuOpen} 
            isLoading={props.isLoading}/>
    )
}
