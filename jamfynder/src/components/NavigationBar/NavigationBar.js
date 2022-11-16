import React, {Component} from 'react';
import  {useEffect, useState} from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./NavigationBar.css";

const CLIENT_ID = "92559e9d1a7f45cd87669f2d2194753f";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/Player";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", 
                "user-read-playback-state", 
                "user-modify-playback-state", 
                "streaming",
                "playlist-read-private",
                "playlist-modify-private",
                "playlist-modify-public"
                ];
const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER);

const handleLogin = () => {
  window.location = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARM}&response_type=token&show_dialog=true`;
};

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInURL = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInURL.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
}

const NavigationBar = () => {
  
  useEffect(() => {
    if(window.location.hash) {
      const {
        access_token, 
        expires_in, 
        token_type
      } = getReturnedParamsFromSpotifyAuth(window.location.hash);
      console.log({access_token})

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  })

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
