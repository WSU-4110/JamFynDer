import React from 'react';
import "./AboutUs.css";

//Calling on the mp4 player for background video
const AboutUs = () => {
    return (
        <div className="About">
            <video src='./guitar.mp4' autoPlay loop muted />
            <h1>About Us</h1>
            <p>
                Hello,Welcome to JamFynDer!
            </p>
            <br/>
            <p>
                Want to discover new music and update your playlists to the latest music trends? Then you have come to the right place!
            </p>
            <br/>
            <p>
                Our mission is to ensure that our listners are given the best jamming experience possible 
                all the while being exposed to the latest hits based on their musical taste!
            </p>
        </div>
    );
};

export default AboutUs;
