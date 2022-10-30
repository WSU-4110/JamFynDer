import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./NavigationBar.css";
import {handleLogin} from "../Login/Login.js";
const NavigationBar = () => {

  return (
    <header className="NavigationBar">
      <nav>
        <ul>
          <Link to="/welcome">
            <li>Home</li>
          </Link>

          <Link onClick={handleLogin}>
            <li>Login</li>
          </Link>

          <Link to="/about_us">
            <li>About Us</li>
          </Link>

          {/* <Link to="/SettingsPage">
            <li>Settings</li>
          </Link> */}

          <Link to="/tutorial">
            <li>Tutorial</li>
          </Link>

          {/* <Link to="/Player">
            <li>Player</li>
          </Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
