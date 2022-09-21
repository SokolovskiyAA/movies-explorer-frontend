import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <div className="movies-cardlist">
      {props.movies.map((card) => {
        return (
          <MoviesCard key={card.id} card={card} />
        );
      })}
    </div>
  )
}
