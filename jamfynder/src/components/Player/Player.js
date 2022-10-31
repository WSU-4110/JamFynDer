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
    <div className="main">
      <div className="wrapper">
        <div className="sidebar">
          <div className="profile-pic">
            <img
              src="https://avatars.githubusercontent.com/u/54013870?v=4"
              alt="profile-pic"
            ></img>
            <h3> Optimus Prime</h3>
            <p> Professional Badass Dog</p>

            <div className="Button-Order">
              <li>
                <button className="Sidebar-Button"> Manage Account </button>
              </li>
              <li>
                <button className="Sidebar-Button Alert"> Sign out </button>
              </li>
              <li>
                <button className="Sidebar-Button Alert">
                  {" "}
                  Delete Account{" "}
                </button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
