import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css'
import WelcomePage from './components/WelcomePage'
import NavigationBar from './components/NavigationBar'
import TutorialPage from './components/TutorialPage'
import SettingsPage from './components/SettingsPage'
import AboutUs from './components/AboutUs'
import LoginPage from './components/LoginPage'

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Switch>
            <Route path="/welcome">
              <WelcomePage />
            </Route>

            <Route path="/LoginPage">
              <LoginPage />
            </Route>
            
            {
              // <Route path="/player_interface">
              
              // </Route>
            }
            
            <Route path="/SettingsPage">
              <SettingsPage />
            </Route>

            <Route path="/about_us">
              <AboutUs />
            </Route>

            <Route path="/tutorial">
              <TutorialPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
