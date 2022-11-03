import React, {Component} from 'react'
import NavigationBar from '../NavigationBar'
import SpotifyGetPlaylists from "../SpotifyGetPlaylists"


const WelcomePage = () => {
  return (
    <div className="welcome">
      <h1>Welcome to JamFynDer</h1>
      <p>Where good music finds you</p>
      <SpotifyGetPlaylists />
    </div>
  );
}

export default WelcomePage;
