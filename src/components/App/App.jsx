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

import { auth } from '../utils/auth.js';

import './App.css';

function App() {
  const history = useHistory();
  const [movies, setMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [onSavedPage, setOnSavedPage] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  useEffect(() => {
    setMovies(allMovies);
    setIsLoggedIn(false);
    setIsPreloaderOpen(false);
  }, []);

  function onBurgerClick(isSidebarOpen) {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function returntoPrevious() {
    history.goBack();
  };

  function onRegister(name, email, password) {
    auth.register({ name, email, password })
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if (res) {
          setMessage(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }



  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
            <ProtectedRoute path="/movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              isOpen={isSidebarOpen}
              onMenuOpen={onBurgerClick}
              movies={movies}
              isLoading={isPreloaderOpen} />
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              isOpen={isSidebarOpen}
              onMenuOpen={onBurgerClick}
              savedMovies={savedMovies}
              isLoading={isPreloaderOpen} />
            <ProtectedRoute path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              isOpen={isSidebarOpen}
              onMenuOpen={onBurgerClick} />
            <Route path="/signup" >
              <Register
                onRegister={onRegister} />
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
