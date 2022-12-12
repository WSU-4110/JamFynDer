import React, {useState, useEffect, useRef} from "react";
import "./MainPage.css"
import axios from 'axios';
import logo from './test.png'

const MainPage = () => {

console.log(logo);

//Getting users info from spotifyApi
const CLIENT_ID = "92559e9d1a7f45cd87669f2d2194753f"
const [searchKey, setSearchKey] = useState("")
const [artist, setArtist] = useState([])

//Function to increase counter
const [likeS, setLikeS] = useState(0)
function likeSong(){  
    setLikeS(function(prev){
        return prev+1
    })
    alert("Song Was Liked!")
}

//Using async to get data from spotify using axios
const searchBar = async (e) => {
    e.preventDefault()
    const{data} = await axios.get("https://api.spotify.com/v1/search",{
        params: {
            q: searchKey,
            type: "artist"
        }
    }) 

    //Calling data for artists data
    setArtist(data.artist.items)
}

//Function for decreasing counter
function dislikeSong(){
    setLikeS(prev=> {
        return prev-1
    })
    alert("Song Was Disliked!")
}

const buttonRef = useRef();

    return(
        <div className="MainPage" ref={buttonRef}>
            <h2>Likes/Dislikes {likeS}</h2>
            <button className="mplike" onClick={likeSong}>Like</button>
            <img id="MyImage" src={logo} alt="Test" />
            <button className="mpdislike" onClick={dislikeSong}>Dislike</button>
            <h1> </h1>
            <form onSub={searchBar}>
            <input type="text" onChange={e=>setSearchKey(e.target.value)}/> 
            <button className="searchB" type={"Submit"}> Create Playlist</button>
            </form>
        </div>
    )

}

//Function created to display album image
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
