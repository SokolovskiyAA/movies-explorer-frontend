import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { savedMovies, allMovies } from '../../utils/constants';

import './App.css';

function App() {
  const history = useHistory();
  const [movies, setMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [onSavedPage, setOnSavedPage] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);

  useEffect(() => {
    setMovies(allMovies);
    setIsLoggedIn(true);
    setIsPreloaderOpen(false);
  }, []);

  function onBurgerClick(isSidebarOpen) {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function returntoPrevious() {
    history.goBack();
  };



  return (
    <CurrentUserContext.Provider value={{ onSavedPage, setOnSavedPage }}>
      <div className="app">
        <div className="page__content">
          <Switch>
            <Route exact path="/">
              <Main
                isLoggedIn={isLoggedIn}
                isOpen={isSidebarOpen}
                onMenuOpen={onBurgerClick}
              />
            </Route>
            <Route path="/movies">
              <Movies
                isLoggedIn={isLoggedIn}
                isOpen={isSidebarOpen}
                onMenuOpen={onBurgerClick}
                movies={movies} 
                isLoading={isPreloaderOpen}/>
            </Route>
            <Route path="/saved-movies">
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isOpen={isSidebarOpen}
                onMenuOpen={onBurgerClick}
                savedMovies={savedMovies} 
                isLoading={isPreloaderOpen}/>
            </Route>
            <Route path="/profile" >
              <Profile
                isLoggedIn={isLoggedIn}
                isOpen={isSidebarOpen}
                onMenuOpen={onBurgerClick} />
            </Route>
            <Route path="/signup" >
              <Register />
            </Route>
            <Route path="/signin" >
              <Login />
            </Route>
            <Route path="*">
              <NotFound returntoPrevious={returntoPrevious} />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
