import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./NavigationBar.css";

const CLIENT_ID = "f12088ba0b0c45018df4dad44b51b83d";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/Player";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER);

const NavigationBar = () => {
  const handleLogin = () => {
    window.location = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARM}&response_type=token&show_dialog=true`;
  };
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
