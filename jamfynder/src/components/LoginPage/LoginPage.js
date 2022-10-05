import React from "react";
const CLIENT_ID = "f12088ba0b0c45018df4dad44b51b83d";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/Player";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER);

const LoginPage = () => {
  const handleLogin = () => {
    window.location = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARM}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="LoginPage">
      <h1>Sign-In</h1>
      <button onClick={handleLogin}> Spotify-Sign in</button>
    </div>
  );
};

export default LoginPage;
