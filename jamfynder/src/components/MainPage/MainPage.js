import React, {useState, useEffect} from "react";
import "./MainPage.css"
import axios from 'axios';
import logo from './test.png'

const MainPage = () => {

console.log(logo);

function LikeDislikeFunctions() {
    this.like = function(credentials){/*...*/};
    this.dislike = function(credentials){/*...*/};
    this.songPriority = function (priority) {return 1};
}

function LikeDislikeAdapter(credentials){
        var likear = new LikeDislikeFunctions();
        var dislikear = new LikeDislikeFunctions();

        likear.like(credentials);
        dislikear.dislike(credentials);

        return {
            request: function(likeStart, dislikeStart, likeEnd, dislikeEnd, priority) {
                likear.like(likeStart);
                likear.like(likeEnd);
                dislikear.dislike(dislikeStart);
                dislikear.dislike(dislikeEnd);
                return likear.songPriority(priority);
                return dislikear.songPriority(priority);
            }
        }

}

function prioritize() {

    var likear = new likear();
    var dislikear = new dislikear();
    var credentials = {token: "1-0"};
    var adapter = new LikeDislikeAdapter(credentials);

    var songLike = likear.submit("1");
    console.log("Liked Song: " + songLike);
    songLike = adapter.submit("1");

    var songDislike = dislikear.submit("0");
    console.log("Disliked Song: " + songDislike);
    songDislike = adapter.submit("0");

    console.log("Liked: " + songLike);
    console.log("Disliked: " + songDislike);

}

const [likeS, setLikeS] = useState(0)
function likeSong(){  
    setLikeS(function(prev){
        return prev+1
    })
    alert("Song Was Liked!")
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
            {/* <form onSub={searchBar}>
            <input type="text" onChange={e=>setSearchKey(e.target.value)}/> 
            <button type={"Submit"}> Create Playlist</button>
            </form> */}
        </div>
    )

}


export default MainPage;
