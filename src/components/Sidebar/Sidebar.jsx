import React from "react";
import { NavLink, Link } from "react-router-dom";

import AccountButton from "../AccountButton/AccountButton";
import "./Sidebar.css";

function Sidebar(props) {
  const handleOnClick = () => {
    props.onMenuOpen(props.isOpen);
  }

  return (
    <div className={`app__overlay ${props.isOpen ? "app__overlay_visible" : ""}`}>
      <div
        className={`sidebar ${props.isOpen ? "sidebar_visible" : "sidebar_hidden"}`}
      >
        <nav className="sidebar__links">
          <NavLink
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/"
            exact
            onClick={handleOnClick}
          >
            Главная
          </NavLink>
          <NavLink
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/movies"
            onClick={handleOnClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="saved-movies"
            onClick={handleOnClick}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          to="/profile"
          className="header-navigation__link"
          onClick={handleOnClick}
        >
          <AccountButton />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
