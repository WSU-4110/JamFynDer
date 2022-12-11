import React, { useState, useEffect } from "react";
import "./PlayerPage.css";
import SpotifyWebApi from "spotify-web-api-node"
import Playback from "./Playback";

//global variables
var playlistCreatedState = false;
var JamFynDerPlaylistUri = "";
var currentTrackURI = "";
let playlistUris_dic = [];
var songLimit = 40;


//global hardcoded playlist URI's; can have any arbitrary number
var jazz_uri = "37i9dQZF1DXe0UXHUfHinR";
var bollywood_uri = "0S7boBN3rPfo2F1DXX5U7k";
var soul_uri = "37i9dQZF1DWULEW2RfoSCi";
var hiphop_uri = "37i9dQZF1DX0XUsuxWHRQd";
var kpop_uri = "37i9dQZF1DX9tPFwDMOaN1";

//dictionary to store the genre and the points it has (used in the algorithm for plating songs)
var genre_points = [
    {
        genre: "jazz",
        points: 5
    },
    {
        genre: "bollywood",
        points: 5
    },
    {
        genre: "hiphop",
        points: 5
    },
    {
        genre: "kpop",
        points: 5
    }
]

const PlayerPage = () => {
    //function globals
    const CLIENT_ID = "92559e9d1a7f45cd87669f2d2194753f"
    const REDIRECT_URI = "http://localhost:3000/TEST"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const SPACE_DELIMITER = "%20";
    //scopes needed for login and player
    const SCOPES = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
        "playlist-modify-public",
        "playlist-modify-private"
            ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    const RESPONSE_TYPE = "token";

    //useState hooks used for storing tokens, songlist boolean, and playlistURI's
    const [token, setToken] = useState("")
    const [createdSongList, setCreatedSongList] = useState(false)
    const [playlistUris, setPlaylistUris] = useState([])
    const [likeS, setLikeS] = useState(0);


    //instantiating an instance of the spotify-web-api-node
    const spotifyApi = new SpotifyWebApi({
        clientId: "92559e9d1a7f45cd87669f2d2194753f"
    })
    
    //useEffect hook for getting the user token
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
        

    }, [])
    
    //BEHAVIORAL DESIGN: chain of responsibility
    //need to give the spotifyApi instance the access token to run further API calls
    spotifyApi.setAccessToken(token);

    //function to check if the next song is playable. i.e. when we like or dislike a song, check if the next one
    //genre has enough points to warrant a play
    const checkIfNextSongPlayable = () => {
        //first skip to the next song
        spotifyApi.skipToNext()
        .then(() => {
            //pause the playback to check whether the song should be played
            spotifyApi.pause()
            .then(function() {

                //setTimeout is used to wait for the api calls to happen in order. We want the song to be 
                //skipped before we fetch the current playing track
                setTimeout(() => {
                    //once we get the current track, we start the search
                    spotifyApi.getMyCurrentPlayingTrack()
                    .then(function(res) {  

                        currentTrackURI = res.body.item.uri;
                        //BEHAVIORAL DESIGN: Iteration: iterating through the dictionaries
                        //search for the current track, then get the genre of that track
                        for (let i = 0; i < playlistUris_dic.length; i++) {
                            if (playlistUris_dic[i].track_uri === currentTrackURI){

                                let genre_match = playlistUris_dic[i].genre;

                                //BEHAVIORAL DESIGN: Iteration: iterating through the dictionaries
                                //search the genre_points and then determine if the song should be playable
                                for (let j = 0; j < genre_points.length; j++){
                                    
                                    if (genre_points[j].genre === genre_match){
                                        if (genre_points[j].points === 0){

                                            //if the song is not playbale, implement a recursive call to check the next
                                            //song again
                                            console.log(genre_points[j].genre + " points is 0");
                                            checkIfNextSongPlayable();

                                            /**
                                             * console.log("recursion call")
                                            spotifyApi.skipToNext()
                                            .then(function() {
                                                console.log('Skip to next');
                                            }, function(err) {
                                                console.log('Something went wrong!', err);
                                            });
                                             */
                                            
                                        }
                                        //if the next song is playable then resume the playback with the 
                                        //play API call
                                        else{
                                            spotifyApi.play()
                                            .then(function() {
                                                }, function(err) {
                                                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                                console.log('Something went wrong!', err);
                                            });
                                            break;
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        
                    }, function(err) {
                        console.log('Something went wrong! - getMyCurrentPlayingTrack()', err);
                    })
                  }, 1000)
                }, function(err) {
                    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                    console.log('Something went wrong!', err);
            })
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        })
    }

    //function to increase the points of a genre
    const increasePoints = () => {
        //BEHAVIORAL DESIGN: Iteration: iterating through the dictionaries
        //search the dictionaries for the genre of the song, and then increment the points
        for (let i = 0; i < playlistUris_dic.length; i++) { 
            if (playlistUris_dic[i].track_uri === currentTrackURI){
                let genre_match = playlistUris_dic[i].genre;
                for (let j = 0; j < genre_points.length; j++){ 
                    if (genre_points[j].genre === genre_match){ 
                        genre_points[j].points += 1;
                        console.log("Liked, " + genre_points[j].genre + " points are now at: " + genre_points[j].points);
                        break;
                    }
                }
                break;
            }
        }
    }

    //function to decrease the points of the genre
    const decreasePoints = () => {
        //BEHAVIORAL DESIGN: Iteration: iterating through the dictionaries
        //search the dictionaries for the genre of the song
        for (let i = 0; i < playlistUris_dic.length; i++) {
            if (playlistUris_dic[i].track_uri === currentTrackURI){

                let genre_match = playlistUris_dic[i].genre;

                for (let j = 0; j < genre_points.length; j++){
                    
                    if (genre_points[j].genre === genre_match){
                        //if the points are already at 0 then we can't decremenet further
                        if (genre_points[j].points === 0){
                            console.log("Disliked, " + genre_points[j].genre + " points is already at 0, can't subtract more points")                            
                        }
                        else{
                            //if not at 0, then decrement the points of the genre
                            genre_points[j].points -= 1;
                            console.log("Disliked, " + genre_points[j].genre + " points are now at: " + genre_points[j].points);
                            break;
                        }
                        
                        break;
                    }
                }
                break;
            }
        }
    }

    //another useEffect hook to create song list
    useEffect(() => {
        //getting the playlists from the hardcoded URI's
        spotifyApi.getPlaylist(jazz_uri) // jazz
        .then(res => {
            res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                playlistUris_dic.push({
                    //pushing each song in the dictionary along with genre member
                    track_uri: trackUri.track.uri,
                    genre: "jazz"
                });
            })
        })
        .then(() => {
            spotifyApi.getPlaylist(hiphop_uri) // hip hop
            .then(res => {
                res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                    playlistUris_dic.push({
                        track_uri: trackUri.track.uri,
                        genre: "hiphop"
                    });
                })
            })
            .then(() => {
                spotifyApi.getPlaylist(kpop_uri) // kpop
                .then(res => {
                    res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                        playlistUris_dic.push({
                            track_uri: trackUri.track.uri,
                            genre: "kpop"
                        });
                    })
                })
                .then(() => {
                    spotifyApi.getPlaylist(bollywood_uri) // bollywood
                    .then(res => {
                        res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                            playlistUris_dic.push({
                                track_uri: trackUri.track.uri,
                                genre: "bollywood"
                            });
                        })
                    })
                    .then(() => {
                        for (let i = playlistUris_dic.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            const temp = playlistUris_dic[i];
                    
                            // Swap
                            playlistUris_dic[i] = playlistUris_dic[j];
                            playlistUris_dic[j] = temp;
                        }
    
                        const temp = [];
                        for (let i = 0; i < playlistUris_dic.length; i++) {
                            temp.push(playlistUris_dic[i].track_uri);
                        }
                        setPlaylistUris(temp);

                        spotifyApi.createPlaylist('JAMFYNDER', { 'description': 'My description', 'public': true })
                        .then(function(data) {
                            console.log("Playlist created with uri: " + data.body.uri);
                            var temp_uri = data.body.uri
                            JamFynDerPlaylistUri = temp_uri.split(":")[2];
                            }, 
                            function(err) {
                            console.log('Something went wrong - createPlaylist()!', playlistCreatedState, err);
                            }
                        )
                    })
                })
            })
        })
    },[createdSongList])

    //BEHAVIORAL DESIGN: Chain of Responsibility: logging out will go higher in the chain and not allow 
    //the user to use the player, or any other features with api calls
    //logout function to remove the token on logout
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    //function for when a song is liked
    const likeSong = () => {
        //use the api to get the current track, increase the points, and add it to a created playlist
        //called JAMFYNDER
        spotifyApi.getMyCurrentPlayingTrack()
        .then(function(data) {
            
            currentTrackURI = data.body.item.uri;    
        
            increasePoints();

            spotifyApi.addTracksToPlaylist(JamFynDerPlaylistUri, [currentTrackURI])
            .then(() => {
                console.log('Added tracks to playlist!');

                checkIfNextSongPlayable();
                
            }, function(err) {
            console.log('Something went wrong addTracksToPlaylist()!', err);
            })
        }, function(err) {
                console.log('Something went wrong!', err);
        })     

        setLikeS(function(prev){
            return prev+1
        })
       
        
    }

    //function for when the song is disliked
    const dislikeSong = () => {
        //get the current track, and then decrease the points 
        spotifyApi.getMyCurrentPlayingTrack()
            .then(function(data) {
                console.log('Now playing: ' + data.body.item.name);
                console.log("uri: " + data.body.item.uri);    
                currentTrackURI = data.body.item.uri; 

                decreasePoints();

                checkIfNextSongPlayable();

            }, function(err){
                console.log('Something went wrong!', err);
        }) 

        setLikeS(prev=> {
            return prev-1
        })
        
    }
    
    //returning information
    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
            </header>
            <h2 className="likeText">Likes/Dislikes : {likeS}</h2>
             <button className="like" onClick={likeSong}><span>Like Song</span></button>
            <button className="like" onClick={dislikeSong}><span>Dislike Song</span></button>

            <div>
                {
                    !token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button classname="like" onClick={logout} ><span>Logout</span></button>}

                    {token ?
                        <div>
                            <h1>Select genres</h1>
                               <button className="button" onClick={() => setCreatedSongList(true)}><img class= "goku" id = 'thing' 
                            src="https://media.giphy.com/media/GRSnxyhJnPsaQy9YLn/giphy.gif"
                            alt='Delete image' height ="100" width="100"/>
                            Create Song Container</button>
                        </div>
                        : <h2>Please login</h2>
                    }
            </div>
      
            <div>
                <Playback token={token} uris="test" proponent={playlistUris} />
            </div>
        </div>
    );
};

export default PlayerPage;
