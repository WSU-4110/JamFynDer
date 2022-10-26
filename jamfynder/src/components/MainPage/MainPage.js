import React from "react";
import "./MainPage.css"
import MyImage from "./JamFynder.png";

const ENDPOINT = "https://api.spotify.com/v1/artists/{{artist_id}}/top-tracks?country={{country_code}}";

const MainPage = () => {
    return(
        <div className="MainPage">
            <img src={MyImage} alt="logo" />
            <h1 id="MyImage"></h1>
            <h1>Welcome to the main page!</h1>
            <button>Like</button>
            <button>Dislike</button>
        </div>
    )
}

export default MainPage;