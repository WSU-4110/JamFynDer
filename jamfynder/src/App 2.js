import React, { Component, useState, useEffect } from "react";
import WebPlayback from './WebPlayback'
import Login from './Login'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import WelcomePage from "./components/WelcomePage";
import NavigationBar from "./components/NavigationBar";
import TutorialPage from "./components/TutorialPage";
import SettingsPage from "./components/SettingsPage";
import AboutUs from "./components/AboutUs";
import Player from "./components/Player";
import MainPage from "./components/MainPage";

const CLIENT_ID = "ab2cec240910490883a87fd0b46393f8";
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

const App = () => {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);
  
  return (
    <div>
        { 
          (token === '') ? <Login/> : <WebPlayback token={token} /> 
        }
    </div>
    // <Router>
    //   <div className="App">
    //     <NavigationBar />
    //     <div className="content">
    //       <Switch>
    //         <Route path="/welcome">
    //           <WelcomePage />
    //         </Route>

    //         <Route path="/Player">
    //           <Player />
    //         </Route>

    //         <Route path="/SettingsPage">
    //           <SettingsPage />
    //         </Route>

    //         <Route path="/MainPage">
    //           <MainPage />
    //         </Route>

    //         <Route path="/about_us">
    //           <AboutUs />
    //         </Route>

    //         <Route path="/tutorial">
    //           <TutorialPage />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
  );
};

export default App;
