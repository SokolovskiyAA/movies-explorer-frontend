import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page__content">
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
            <Route path="/signup"
              component={Register}
            />
            <Route path="/signin"
              component={Register}
            />
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
