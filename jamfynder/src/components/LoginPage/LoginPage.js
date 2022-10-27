import React from "react";
const CLIENT_ID = "ab2cec240910490883a87fd0b46393f8";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/";
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
