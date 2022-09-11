import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page__content">
          <Header>
          </Header>
          <Switch>
            <Route exact path="/" component={Main}>
            </Route>
            <ProtectedRoute path="/movies"
              component={Movies}
            />
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
            />
            <ProtectedRoute path="/profile"
              component={Profile}
            />
          </Switch>
        </div>

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
