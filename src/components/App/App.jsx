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

import { auth } from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';

import './App.css';

function App() {
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");

  const token = localStorage.getItem('jwt');


  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          history.push("/signin");
          console.log(err)
        });
    }
    handleCheckToken();
  }, [isLoggedIn, token, history]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      mainApi.getSavedMovies(jwt)
        .then((res) => {
          const movies = res.filter((m) => m.owner === currentUser._id);
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [currentUser._id, isLoggedIn]); //, savedMovies

  function onBurgerClick(isSidebarOpen) {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function returntoPrevious() {
    history.goBack();
  };

  function onRegister(name, email, password) {
    auth.register({ name, email, password })
      .then((res) => {
        if (res) {
          onLogin(email, password);
          setMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setMessage(e.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function onLogin(email, password) {
    auth.login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleCheckToken();
          history.push("/movies");
          setMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setMessage(e.message);
        }
        setIsLoggedIn(false);
      })
      .catch((e) => console.log(e));
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          history.push("/movies");
        })
        .catch((err) => {
          setMessage(err);
        });
    } else {
      return;
    }
  }

  function logoutProfile() {
    localStorage.clear();
    history.push('/');
    setIsLoggedIn(false);
  }

  function handleUpdateUser(userData) {
    mainApi.updateUserInfo(userData, token)
      .then((userData) => {
        setCurrentUser(userData);
        setTypeMessage("success");
        setMessage("Изменения сохранены");
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setTypeMessage("fail");
          setMessage(e.message);
        }
      })
      .catch((e) => console.log(e));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              savedMovies={savedMovies}
              isLoading={isPreloaderOpen}
              moviesPage={true} 
              setSavedMovies={setSavedMovies}/>
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              isOpen={isSidebarOpen}
              onMenuOpen={onBurgerClick}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              isLoading={isPreloaderOpen}
              moviesPage={false} />
            <ProtectedRoute path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              isOpen={isSidebarOpen}
              onMenuOpen={onBurgerClick}
              logoutProfile={logoutProfile}
              message={message}
              setMessage={setMessage}
              typeMessage={typeMessage}
              handleUpdateUser={handleUpdateUser} />
            <Route path="/signup" >
              <Register
                onRegister={onRegister}
                message={message}
                setMessage={setMessage} />
            </Route>
            <Route path="/signin" >
              <Login
                onLogin={onLogin}
                message={message}
                setMessage={setMessage} />
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
