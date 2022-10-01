import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './App.css'
import WelcomePage from './components/WelcomePage'
import NavigationBar from './components/NavigationBar'

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
              <h1>Login</h1>
            </Route>

            <Route path="/player_interface">
              <h1>Player Interface</h1>
            </Route>

            <Route path="/settings">
              <h1>Settings</h1>
            </Route>

            <Route path="/about_us">
              <h1>About Us</h1>
            </Route>

            <Route path="/tutorial">
              <h1>Tutorial</h1>
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
