import React from "react";
import "./WelcomePage.css";

// import NavigationBar from '../NavigationBar'

const WelcomePage = () => {
  return (
    <div className="Hero">
      {/* <div class="loader_bg">
        <div class="loader"></div>
      </div> */}

      <div class="Background-Video">
        <video autoPlay muted loop>
          <source
            src="https://www.dropbox.com/s/d3xpfg5c607fo5h/156.mp4?raw=1"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="Welcome"></div>
      <h1>Welcome to JamFynDer</h1>
      <p>Where good music finds you</p>
    </div>
  );
};

export default WelcomePage;
