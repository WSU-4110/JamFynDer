import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar(props) {
  return (
    <nav className="nav">
      <h2 className="new-label">
        <font color="#8c52ff">J</font>
        <font color="#ff66c4">F</font>
      </h2>
      <ul className="navbar">
        <Link to="/welcome">
          <li className="active">Home</li>
        </Link>

        <Link to="/about_us">
          <li>About Us</li>
        </Link>

        <Link to="/mainpage">
          <li>MainPage Prototype</li>
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

        <Link to="/TEST">
          <li>Test</li>
        </Link>

        <Link>
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavigationBar;
