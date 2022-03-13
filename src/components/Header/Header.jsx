import * as React from "react";
import { Link } from "react-router-dom";

import { NavLink } from "../NavigationButton/NavigationButton";
import logo from "../../assets/logo.png";
import "./Header.css";

export const Header = ({ username, isAuth, signOut }) => {
  const handleClick = e => {
    e.preventDefault();
    signOut();
  };
  return (
    <header>
      <div className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <input type="checkbox" id="toggle-menu" />
        <label htmlFor="toggle-menu">
          <span className="menu-icon" />
        </label>
        <nav>
          {!isAuth ? (
            <>
              <NavLink link="/signup" text="Регистрация" />
              <NavLink link="/signin" text="Авторизация" />
            </>
          ) : (
            <>
              <h1>{username}</h1>
              <a href="/" className="nav_button" onClick={handleClick}>
                Выйти
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
