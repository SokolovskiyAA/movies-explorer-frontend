import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <div className="movies-cardlist">
      {props.movies.map((movie) => {
        return (
          <MoviesCard
            key={movie.id || movie.movieId}
            card={movie}
            moviesPage={props.moviesPage}
            savedMovies={props.savedMovies}
            onSaveHandler={props.onSaveHandler}
            onDeleteHandler={props.onDeleteHandler}
          />
        );
      })}
    </div>
  )
}
