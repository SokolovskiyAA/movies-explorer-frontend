import React, { useState, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import useDeviceScreenWidth from "../../hooks/useDeviceScreenWidth";
import {
    LAPTOP_WIDTH,
    LAPTOP_COUNT_MOVIES_START,
    LAPTOP_COUNT_MOVIES_MORE,
    MOBILE_COUNT_MOVIES_START,
    MOBILE_COUNT_MOVIES_MORE,
} from "../../utils/constants";

import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

import "./Movies.css";

export default function Movies(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [lastQuery, setLastQuery] = useState("");
    const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
    const [serchMessage, setSerchMessage] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [countMoviesToShow, setCountMoviesToShow] = React.useState(LAPTOP_COUNT_MOVIES_START);
    const [countMoviesToShowMore, setCountMoviesToShowMore] = React.useState(LAPTOP_COUNT_MOVIES_MORE);

    const token = localStorage.getItem("jwt");
    let allMovies = JSON.parse(localStorage.getItem("allMovies")) || [];
    //const settingData = props.moviesPage ? localStorage.getItem("settingData") : localStorage.getItem("settingDataSavePage");
    const settingData = props.moviesPage && localStorage.getItem("settingData");
    let filteredMovies = JSON.parse(settingData)?.filteredMovies || [];
    let filteredShortMovies = JSON.parse(settingData)?.filteredShortMovies || [];
    const screenWidth = useDeviceScreenWidth();
    const hasMore = shortFilmsCheck ? filteredShortMovies.length !== movies.length : filteredMovies.length !== movies.length;

    useEffect(() => {
        if (settingData && props.moviesPage) {
            setLastQuery(JSON.parse(settingData)?.query);
            setShortFilmsCheck(JSON.parse(settingData)?.isShortMovies);
        }
    }, []);   

    useEffect(() => {
        
        if (props.moviesPage) {
            shortFilmsCheck
                ? setMovies(filteredShortMovies.slice(0, movies.length === 0 ? countMoviesToShow : movies.length))
                : setMovies(filteredMovies.slice(0, movies.length === 0 ? countMoviesToShow : movies.length));
        }
        else {
            shortFilmsCheck
                ? setMovies(filterShortMovies(props.savedMovies, lastQuery))
                : setMovies(filterMovies(props.savedMovies, lastQuery));
        }
    }, [props.moviesPage, shortFilmsCheck, props.savedMovies, lastQuery]);

    useEffect(() => {
        if (settingData) {
            const updatedQuery = JSON.parse(settingData);
            updatedQuery.isShortMovies = shortFilmsCheck;
            props.moviesPage ? localStorage.setItem("settingData", JSON.stringify(updatedQuery)) :
                localStorage.setItem("settingDataSavePage", JSON.stringify(updatedQuery));
        }
    }, [props.moviesPage, shortFilmsCheck, settingData]);

    useEffect(() => {
        if (movies.length === 0 && !isFirstLoad) {
            setSerchMessage("Ничего не найдено");
        }
        else {
            setSerchMessage("");
        }
    }, [movies]);

    React.useEffect(() => {
        if (props.moviesPage) {
            if (screenWidth > LAPTOP_WIDTH) {
                setCountMoviesToShow(LAPTOP_COUNT_MOVIES_START);
                setCountMoviesToShowMore(LAPTOP_COUNT_MOVIES_MORE);
            } else if (screenWidth <= LAPTOP_WIDTH) {
                setCountMoviesToShow(MOBILE_COUNT_MOVIES_START);
                setCountMoviesToShowMore(MOBILE_COUNT_MOVIES_MORE);
            }
        }
    }, [screenWidth, props.moviesPage]);

    function filterMovies(movies, query) {
        return query ? movies.filter((movie) => movie.nameRU.toLowerCase().includes(query.toLowerCase())) : movies;
    }

    function filterShortMovies(movies, query) {
        return query ? filterMovies(movies, query).filter((movie) => movie.duration < 40) : movies;
    }

    const submitHandler = async (isShortMovies, query) => {
        setSerchMessage("");
        setIsFirstLoad(false);
        try {
            setIsLoading(true);
            setLastQuery(query);
            if (allMovies.length === 0) {
                const allMoviesData = await moviesApi.getMovies();
                localStorage.setItem("allMovies", JSON.stringify(allMoviesData));

                //setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
                allMovies = JSON.parse(localStorage.getItem("allMovies"));
            }

            // фильтр
            filteredMovies = props.moviesPage ? filterMovies(allMovies, query) : filterMovies(props.savedMovies, query);
            filteredShortMovies = props.moviesPage ? filterShortMovies(allMovies, query) : filterShortMovies(props.savedMovies, query);
            // создаем объект для сохранения в localStorage

            const settingData = {
                filteredMovies,
                filteredShortMovies,
                query,
                isShortMovies,
            };

            if (props.moviesPage)
                localStorage.setItem("settingData", JSON.stringify(settingData));

            // следим за чекбоксом выводим результат
            if (isShortMovies) {
                // отображаем только первоначальное кол-во карточек, используя slice
                props.moviesPage ? setMovies(filteredShortMovies.slice(0, countMoviesToShow)) : query ?
                    setMovies(filteredShortMovies) : setMovies(props.savedMovies);
            } else {
                props.moviesPage ? setMovies(filteredMovies.slice(0, countMoviesToShow)) : query ?
                    setMovies(filteredMovies) : setMovies(props.savedMovies);
            }

            if(movies.length === 0) {
                setSerchMessage("Ничего не найдено");
            }

            setIsLoading(false);
        } catch (e) {
            setMovies([]);
            setSerchMessage("Во время запроса произошла ошибка.");
            setIsLoading(false);
        }
    };

    const saveMovie = (movie, likeHandler) => {
        mainApi
            .createMovie(movie, token)
            .then((newMovie) => {
                // после ответа добавляем новый фильм в стейт
                props.setSavedMovies([...props.savedMovies, newMovie]);
                // меняем кнопку
                likeHandler(true);
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) {
                    console.log(e.message);
                }
            })
            .catch((e) => console.log(e));
    };

    const deleteMovie = (movieId, likeHandler) => {
        const movieToDelete = props.savedMovies.find((movie) => movie.movieId === movieId);

        mainApi
            .removeMovie(movieToDelete._id, token)
            .then(() => {
                likeHandler(false);
                props.setSavedMovies(props.savedMovies.filter((movie) => movie.movieId !== movieId));
            })
            .catch((e) => console.log(e));
    };

    function handleClickMore() {
        const end = movies.length + countMoviesToShowMore;
        if (shortFilmsCheck) {
            const newMovies = filteredShortMovies.slice(movies.length, end);
            setMovies([...movies, ...newMovies]);
        }
        else {
            const newMovies = filteredMovies.slice(movies.length, end);
            setMovies([...movies, ...newMovies]);
        }
    }

    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                isOpen={props.isOpen}
                onMenuOpen={props.onMenuOpen} />
            <main className="movies movies-page__movies" aria-label="Фильмы">
                <SearchForm
                    onSubmit={submitHandler}
                    isCheckBox={shortFilmsCheck}
                    setIsCheckBox={setShortFilmsCheck}
                    lastQuery={lastQuery}
                />
                {isLoading ? (<Preloader />) : (
                    <MoviesCardList
                        movies={movies}
                        savedMovies={props.savedMovies}
                        moviesPage={props.moviesPage}
                        onSaveHandler={saveMovie}
                        onDeleteHandler={deleteMovie}
                    />)
                }
                {!isLoading && (
                    <p className="movies__message">{serchMessage}</p>
                )}
                {props.moviesPage && !isLoading && !serchMessage && hasMore && (
                    <div className="movies__add">
                        <Button className="button_type_more"
                            handler={handleClickMore}
                        >Ещё</Button>
                    </div>
                )}

            </main>
            <Footer />
        </>
    );
}
