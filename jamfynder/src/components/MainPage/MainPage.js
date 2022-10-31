import React, {useState, useEffect} from "react";
import "./MainPage.css"
import axios from 'axios';

const MainPage = () => {


const CLIENT_ID = "ab2cec240910490883a87fd0b46393f8"
const [searchKey, setSearchKey] = useState("")
const [artist, setArtist] = useState([])

    return(
        <div className="MainPage">
            <button>Like</button>
            <button>--------------------</button>
            <button>Dislike</button>
        </div>
    )
}

const displayImage = () => {

    const [artist, setArtist] = useState([])

    return artist.map(artist =>(
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src = {artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}

export default MainPage;
