import { useState, useEffect } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers </p>
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Avatar" />
                )}
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
