import './NotFound.css';
import Button from '../Button/Button';

export default function NotFound(props) {
  return (
    <main className="not-found">
      <div className="not-found__error-block">
        <p className="not-found__error">404</p>
        <p className="not-found__error-description">Страница не найдена</p>
      </div>
      <Button className={"not-found__button"}>
        Назад
      </Button>
      {/* <button className="not-found__button" onClick={props.returntoPrevious}>Назад</button> */}
    </main>
  );
}