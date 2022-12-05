import React, { useState, useEffect } from "react";
import "./TEST.css";
import SpotifyWebApi from "spotify-web-api-node"
import Playback from "./Playback";

var playlistCreatedState = false;
var JamFynDerPlaylistUri = "";
var currentTrackURI = "";
let playlistUris_dic = [];
var songLimit = 40;

var jazz_uri = "37i9dQZF1DXe0UXHUfHinR";
var soul_uri = "37i9dQZF1DWULEW2RfoSCi";
var hiphop_uri = "37i9dQZF1DX0XUsuxWHRQd";
var kpop_uri = "37i9dQZF1DX9tPFwDMOaN1";

var genre_points = [
    {
        genre: "jazz",
        points: 5
    },
    {
        genre: "soul",
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

const TEST = () => {
    const CLIENT_ID = "92559e9d1a7f45cd87669f2d2194753f"
    const REDIRECT_URI = "http://localhost:3000/TEST"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const SPACE_DELIMITER = "%20";
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

    const [token, setToken] = useState("")
    const [createdSongList, setCreatedSongList] = useState(false)
    const [playlistUris, setPlaylistUris] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "92559e9d1a7f45cd87669f2d2194753f"
    })
    
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
    
    spotifyApi.setAccessToken(token);

    const checkIfNextSongPlayable = () => {
        spotifyApi.skipToNext()
        .then(() => {
            spotifyApi.pause()
            .then(function() {

                setTimeout(() => {
                    spotifyApi.getMyCurrentPlayingTrack()
                    .then(function(res) {  

                        currentTrackURI = res.body.item.uri;

                        for (let i = 0; i < playlistUris_dic.length; i++) {
                            if (playlistUris_dic[i].track_uri === currentTrackURI){

                                let genre_match = playlistUris_dic[i].genre;

                                for (let j = 0; j < genre_points.length; j++){
                                    
                                    if (genre_points[j].genre === genre_match){
                                        if (genre_points[j].points === 0){

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

    const increasePoints = () => {
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

    const decreasePoints = () => {
        for (let i = 0; i < playlistUris_dic.length; i++) {
            if (playlistUris_dic[i].track_uri === currentTrackURI){

                let genre_match = playlistUris_dic[i].genre;

                for (let j = 0; j < genre_points.length; j++){
                    
                    if (genre_points[j].genre === genre_match){
                        if (genre_points[j].points === 0){
                            console.log("Disliked, " + genre_points[j].genre + " points is already at 0, can't subtract more points")                            
                        }
                        else{
                            // 8. if not at 0, then decrement the points of the genre
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

    // create song list
    useEffect(() => {
        spotifyApi.getPlaylist(jazz_uri) // jazz
        .then(res => {
            res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                playlistUris_dic.push({
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
                    spotifyApi.getPlaylist(soul_uri) // soul
                    .then(res => {
                        res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                            playlistUris_dic.push({
                                track_uri: trackUri.track.uri,
                                genre: "soul"
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

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const likeSong = () => {
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
        
    }

    const dislikeSong = () => {
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
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
            </header>

<<<<<<< HEAD
            <button className="button" onClick={likeSong}><span>Like Song</span></button>
=======
            <button className="like" onClick={likeSong}>Like Song</button>
            <button className="dislike" onClick={dislikeSong}>Dislike Song</button>
>>>>>>> 61798e0e04521e93b6ce34da49b1c61f7c684a63

            <div>
                {
                    !token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button className="button" onClick={logout} ><span>Logout</span></button>}

                    {token ?
                        <div>
                            <h1>Select genres</h1>
                            <button onClick={() => setCreatedSongList(true)}>Create Song Container</button>
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

export default TEST;