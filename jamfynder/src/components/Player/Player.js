import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../Spotify/spotify";
import "./Player.css";
import { SectionWrapper, ArtistsGrid } from "../styles";


const Player = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);

        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data);

        const userTopArtist = await getTopArtists();
        setTopArtists(userTopArtist.data);

        const userTopTracks = await getTopTracks();
        setTopTracks(userTopTracks.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <body className="main">
      <video class="vid-background" autoPlay muted loop>
        <source
          src="https://www.dropbox.com/s/yy6w5fk6dl6fwx9/video.mp4?raw=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div>
        {profile && (
          <div className="Content">
            <div className="Banner">
              {profile.images.length && profile.images[0].url && (
                <img
                  className="profileImg"
                  src={profile.images[0].url}
                  alt="Avatar"
                />
              )}
              <h1>{profile.display_name}</h1>
              <p className="sub-heading">{profile.followers.total} Followers</p>
              <p className="header__meta">
                {playlists && (
                  <span className="sub-heading">
                    {playlists.total} Playlist{playlists.total !== 1 ? "s" : ""}
                  </span>
                )}
                <span className="sub-heading">
                  {profile.followers.total !== 1 ? "s" : ""}
                </span>
              </p>
              {topArtists && (
                <main className="artistCss">
                  <SectionWrapper className="artist-move">
                    <ArtistsGrid artists={topArtists.items.slice(0, 7)} />
                  </SectionWrapper>
                </main>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
