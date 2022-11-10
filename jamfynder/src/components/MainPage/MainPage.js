import React, {useState, useEffect} from "react";
import "./MainPage.css"
import axios from 'axios';
import logo from './test.png'

const MainPage = () => {

console.log(logo);

const CLIENT_ID = "ab2cec240910490883a87fd0b46393f8"
const [searchKey, setSearchKey] = useState("")
const [artist, setArtist] = useState([])

const [likeS, setLikeS] = useState(0)
function likeSong(){  
    setLikeS(function(prev){
        return prev+1
    })
    alert("Song Was Liked!")
}

const searchBar = async (e) => {
    e.preventDefault()
    const{data} = await axios.get("https://api.spotify.com/v1/search",{
        params: {
            q: searchKey,
            type: "artist"
        }
    }) 

    setArtist(data.artist.items)
}


function dislikeSong(){
    setLikeS(prev=> {
        return prev-1
    })
    alert("Song Was Disliked!")
}


    return(
        <div className="MainPage">
            <h2>Likes/Dislikes {likeS}</h2>
            <button onClick={likeSong}>Like</button>
            <img id="MyImage" src={logo} alt="Test" />
            <button onClick={dislikeSong}>Dislike</button>
            <h1> </h1>
            <form onSub={searchBar}>
            <input type="text" onChange={e=>setSearchKey(e.target.value)}/> 
            <button type={"Submit"}> Create Playlist</button>
            </form>
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
