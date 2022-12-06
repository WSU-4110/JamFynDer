import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { accessToken, logout, getCurrentUserProfile } from "../Spotify/spotify";
import "./Player.css";

const Player = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return (
    <body className="main">
      <div>
        {profile && (
          <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
            {profile.images.length && profile.images[0].url && (
              <img src={profile.images[0].url} alt="Avatar" />
            )}
          </div>
        )}
      </div>
    </body>
  );
};

export default Player;
