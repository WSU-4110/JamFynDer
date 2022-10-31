
import React, { Component } from "react";

const CLIENT_ID = "f12088ba0b0c45018df4dad44b51b83d";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/Player";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER);

  const handleLogin = () => {
    return (window.location = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARM}&response_type=token&show_dialog=true`);
  };

  const gotcha = () => {
    return alert("hello world");
  }

  export {handleLogin, gotcha};