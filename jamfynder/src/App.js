import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

<<<<<<< HEAD
import './App.css'
import WelcomePage from './components/WelcomePage'
import NavigationBar from './components/NavigationBar'
import TutorialPage from './components/TutorialPage'
import SettingsPage from './components/SettingsPage'
import AboutUs from './components/AboutUs'
=======
import "./App.css";
import WelcomePage from "./components/WelcomePage";
import NavigationBar from "./components/NavigationBar";
>>>>>>> Chris

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

            <Route path="/login">
              
            </Route>

            <Route path="/player_interface">
              
            </Route>

            <Route path="/settings">
<<<<<<< HEAD
              <SettingsPage />
=======
              <h1> Test </h1>
>>>>>>> Chris
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
