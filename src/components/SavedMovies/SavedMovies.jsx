import React, { useContext, useEffect } from "react";
import Movies from '../Movies/Movies';

export default function SavedMovies(props) {
    return (
        <Movies
            savedMovies={props.savedMovies}
            setSavedMovies={props.setSavedMovies}
            isLoggedIn={props.isLoggedIn}
            isOpen={props.isOpen}
            onMenuOpen={props.onMenuOpen}
            isLoading={props.isLoading}
            moviesPage={props.moviesPage} />
    )
}
