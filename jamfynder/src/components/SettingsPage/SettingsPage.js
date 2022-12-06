import React from "react";
import "./SettingsPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { accessToken, logout, getCurrentUserProfile } from "../Spotify/spotify";

const SettingsPage = () => {
  return (
    <div className="SettingsPage">
      <h1>Manage Account</h1>
      <h1>Sign Out</h1>
      <h1>Delete Account</h1>
    </div>
  );
};

export default SettingsPage;
