import React from "react";
import "./Player.css";

const Player = () => {
  // const pushContent = () => {
  //   document.getElementById("main").style.marginLeft = "250px";
  // };

  // window.onload = function() {
  //   pushContent();
  // };

  return (
    <body class="main">
      <div class="wrapper">
        <div class="sidebar">
          <div class="profile-pic">
            <img
              src="https://avatars.githubusercontent.com/u/54013870?v=4"
              alt="profile-pic"
            ></img>
            <h3> Optimus Prime</h3>
            <p> Professional Badass Dog</p>

            <div class="Button-Order">
              <li>
                <button class="Sidebar-Button"> Manage Account </button>
              </li>
              <li>
                <button class="Sidebar-Button Alert"> Sign out </button>
              </li>
              <li>
                <button class="Sidebar-Button Alert"> Delete Account </button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Player;
