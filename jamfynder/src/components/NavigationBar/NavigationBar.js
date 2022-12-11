import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { accessToken, logout, getCurrentUserProfile } from "../Spotify/spotify";

function NavigationBar(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

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

        {/* <Link to="/mainpage">
          <li>Counter Logic</li>
        </Link> */}

        {/* <Link to="/SettingsPage">
            <li>Settings</li>
          </Link> */}

        <Link to="/tutorial">
          <li>Album Search</li>
        </Link>

        {/* <Link to="/Player">
            <li>Player</li>
          </Link> */}

        <Link to="/PlayerPage">
          <li>Player</li>
        </Link>
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in
          </a>
        ) : (
          <>
            <a className="App-link" href="http://localhost:3000/Player">
              Profile
            </a>
            <a className="App-link" onClick={logout}>
              {" "}
              Log Out{" "}
            </a>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
