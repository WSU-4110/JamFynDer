import React, { useState, useEffect } from "react";
import axios from "axios";

//creating an endpoint for the playlists
 const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

 //function to get playlists
const SpotifyGetPlaylists = () => {
  //useState hooks to store the data
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  //useEffect that renders on mount
  useEffect(() => {
    if (localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  //handles auth and the respone
  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then(response => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <button onClick={handleGetPlaylists}>Get Playlists</button>
  );
};

export default SpotifyGetPlaylists;