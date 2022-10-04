import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <header className="NavigationBar">
      <nav>
        <ul>
          <Link to="/welcome">
            <li>Home</li>
          </Link>

          <Link to="/LoginPage">
            <li>Login</li>
          </Link>

          <Link to="/about_us">
            <li>About Us</li>
          </Link>

          <Link to="/SettingsPage">
            <li>Settings</li>
          </Link>

          <Link to="/tutorial">
            <li>Tutorial</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
