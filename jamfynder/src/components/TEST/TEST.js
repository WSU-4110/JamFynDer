import React, { useState, useEffect } from "react";
import "./TEST.css";
import SpotifyWebApi from "spotify-web-api-node"
import Playback from "./Playback";

var playlistCreatedState = false;
var JamFynDerPlaylistUri = "";
var currentTrackURI = "";
let playlistUris_dic = [];
var songLimit = 20;

var jazz_uri = "37i9dQZF1DXe0UXHUfHinR";
var soul_uri = "37i9dQZF1DWULEW2RfoSCi";
var hiphop_uri = "37i9dQZF1DX0XUsuxWHRQd";
var kpop_uri = "37i9dQZF1DX9tPFwDMOaN1";

var genre_points = [
    {
        genre: "jazz",
        points: 0
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

    // create song list
    useEffect(() => {
        console.log(1)
        spotifyApi.getPlaylist(jazz_uri) // jazz
        .then(res => {
            console.log(2)
            res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                playlistUris_dic.push({
                    track_uri: trackUri.track.uri,
                    genre: "jazz"
                });
            })
        })
        .then(() => {
            console.log(3)
            spotifyApi.getPlaylist(hiphop_uri) // hip hop
            .then(res => {
                console.log(4)
                res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                    playlistUris_dic.push({
                        track_uri: trackUri.track.uri,
                        genre: "hiphop"
                    });
                })
            })
            .then(() => {
                console.log(5)
                spotifyApi.getPlaylist(kpop_uri) // kpop
                .then(res => {
                    console.log(6)
                    res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                        playlistUris_dic.push({
                            track_uri: trackUri.track.uri,
                            genre: "kpop"
                        });
                    })
                })
                .then(() => {
                    console.log(7)
                    spotifyApi.getPlaylist(soul_uri) // soul
                    .then(res => {
                        console.log(8)
                        res.body.tracks.items.slice(0,songLimit).map(trackUri => {  
                            playlistUris_dic.push({
                                track_uri: trackUri.track.uri,
                                genre: "soul"
                            });
                        })
                    })
                    .then(() => {
                        console.log(9)
                        // console.log("before shuf")
                        // console.log(playlistUris_dic);
    
                        for (let i = playlistUris_dic.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            const temp = playlistUris_dic[i];
                    
                            // Swap
                            playlistUris_dic[i] = playlistUris_dic[j];
                            playlistUris_dic[j] = temp;
                        }
    
                        // console.log("after shuf")
                        // console.log(playlistUris_dic);
                        const temp = [];
                        for (let i = 0; i < playlistUris_dic.length; i++) {
                            temp.push(playlistUris_dic[i].track_uri);
                        }
                        setPlaylistUris(temp);
                        // console.log(playlistUris);

                        spotifyApi.getMe()
                        .then(function(data) {
                            console.log(10)
                            console.log('Some information about the authenticated user', data.body);
                            console.log(token)
                            
                        }, function(err) {
                            console.log('Something went wrong!', err);
                        });

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
        console.log(1)
        console.log("Song Liked");

        // Create a public playlist
        if (!playlistCreatedState)
        {
            spotifyApi.createPlaylist('JAMFYNDER', { 'description': 'My description', 'public': true })
            .then(function(data) {
                console.log(2)
                console.log("(inside createPlaylist() ) Playlist uri: " + data.body.uri);
                var temp = data.body.uri
                JamFynDerPlaylistUri = temp.split(":")[2];
                console.log("(inside createPlaylist() ) Playlist uri after split(): " + JamFynDerPlaylistUri);
                }, 
                function(err) {
                console.log('Something went wrong - createPlaylist()!', playlistCreatedState, err);
                }
            ).then(() => {
                console.log(3);
                console.log("getting current track uri")
                
                spotifyApi.getMyCurrentPlayingTrack()
                .then(function(data) {
                    console.log('Now playing: ' + data.body.item.name);
                    console.log("uri: " + data.body.item.uri);    
                    
                    currentTrackURI = data.body.item.uri;        
                    
                }, function(err) {
                    console.log('Something went wrong!', err);
                })
                .then(() => {
                    console.log(4)
                    // Add tracks to a playlist
                    spotifyApi.addTracksToPlaylist(JamFynDerPlaylistUri, [currentTrackURI])
                    .then(function(data) {
                        console.log('Added tracks to playlist!');
                        }, function(err) {
                        console.log('Something went wrong - addTracksToPlaylist()!', err);
                    });
                }).then(() => {
                    console.log(5)
                    spotifyApi.skipToNext()
                    .then(function() {
                        console.log('Skip to next');
                        setTimeout(() => {
                            // Pause a User's Playback
                            spotifyApi.pause()
                            .then(function() {
                                console.log('Playback paused');
                                }, function(err) {
                                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                console.log('Something went wrong!', err);
                            }).then(() => {
                                console.log(6)
                                // 1. get current song uri
                                spotifyApi.getMyCurrentPlayingTrack()
                                .then(function(res) {  
                                    console.log(7)
                                    currentTrackURI = res.body.item.uri;        
                                }, function(err) {
                                    console.log('Something went wrong! - getMyCurrentPlayingTrack()', err);
                                }).then(() => {
                                    console.log(8)
                                    // 2. search dic for current song uri
                                    let start=0, end = playlistUris_dic.length-1;
                    
                                    while (start <= end){ // Iterate while start not meets end
                                        let mid = Math.floor((start + end)/2); // Find the mid index
                                
                                        if (playlistUris_dic[mid].track_uri === currentTrackURI){ // If element is present at mid
                                            
                                            // 3. get the genere member of the elemement with matching song uri
                                            let genere_match = playlistUris_dic[mid].genre;
    
                                            // 4. search genere_points dic for genre
                                            let start=0, end = genre_points.length - 1;
                    
                                            while (start <= end){ // Iterate while start not meets end
                                        
                                                let mid = Math.floor((start + end)/2); // Find the mid index
                                        
                                                if (genre_points[mid].genre === genere_match){  // If element is present at mid
                                                    // 5. access points value of that elemement with matching genre
                                                    // 6. check if the points === 0
                                                    if (genre_points[mid].points === 0){
                                                        // 7. if so then skip to next
                                                        console.log(genre_points[mid].genre + " points is 0");
                                                        
                                                        spotifyApi.skipToNext()
                                                        .then(function() {
                                                            console.log('Skip to next');
                                                        }, function(err) {
                                                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                                            console.log('Something went wrong!', err);
                                                        });
                                                    }
                                                    else{
                                                        // else do nothing and finish like song method
                                                        // Start/Resume a User's Playback 
                                                        spotifyApi.play()
                                                        .then(function() {
                                                            console.log('Playback started');
                                                            }, function(err) {
                                                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                                            console.log('Something went wrong!', err);
                                                        });
                                                        break;
                                                    }
                                                }
                                        
                                                // Else look in left or right half accordingly
                                                else if (genre_points[mid] < genere_match)
                                                    start = mid + 1;
                                                else
                                                    end = mid - 1;
                                            }
                                        }
                                        
                                        else if (playlistUris_dic[mid] < currentTrackURI) // Else look in left or right half accordingly
                                            start = mid + 1;
                                        else
                                            end = mid - 1;
                                    }
    
                                    console.log(9)
                                })
    
                                
                            })
                            



                        }, 1000)






                        
                    }, function(err) {
                        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                    });
                });
            });

            playlistCreatedState = true;            
        }
        else {
            console.log(2);
            console.log("PLAYLIST ALREADY CREATED");
            spotifyApi.getMyCurrentPlayingTrack()
            .then(function(data) {
                // get current track
                console.log(3)
                console.log('Now playing: ' + data.body.item.name);
                console.log("uri: " + data.body.item.uri);    
                
                currentTrackURI = data.body.item.uri;     

                // Add track to a playlist
                spotifyApi.addTracksToPlaylist(JamFynDerPlaylistUri, [currentTrackURI])
                .then(() => {
                    console.log(4)
                    console.log('Added tracks to playlist!');

                    // skip to next song
                    console.log("before skip: " + currentTrackURI)
                    spotifyApi.skipToNext()
                    .then(() => {
                        console.log('Skip to next');
                        console.log(5)

                        // pause song
                        spotifyApi.pause()
                        .then(function() {
                            console.log(6)
                            console.log('Playback paused');

                            console.log("start timer")
                            setTimeout(() => {
                                console.log("code in timer startng now")
                                // get current song
                                // 1. get current song uri
                                spotifyApi.getMyCurrentPlayingTrack()
                                .then(function(res) {  
                                    console.log(7)
                                    //console.log("after skip (before assigmnet): " + currentTrackURI) 
                                    currentTrackURI = res.body.item.uri;
                                    console.log(res.body.item.uri)
                                    console.log(data.body.item.uri)
                                    console.log("after skip (after assigmnet): " + currentTrackURI)   
                                    
                                    // determine if song should be skipped
                    
                                    console.log(8)
                                    // 2. search dic for current song uri
                                    for (let i = 0; i < playlistUris_dic.length; i++) { // Iterate while start not meets end 
                                        console.log(playlistUris_dic[i].track_uri)
                                        console.log(currentTrackURI)
                                        if (playlistUris_dic[i].track_uri === currentTrackURI){
                                            console.log(9)
                                            // 3. get the genere member of the elemement with matching song uri
                                            let genre_match = playlistUris_dic[i].genre;

                                            // 4. search genere_points dic for genre
                                            for (let j = 0; j < genre_points.length; j++){ // Iterate while start not meets end
                                                
                                                if (genre_points[j].genre === genre_match){  // If element is present at mid
                                                    console.log(10)
                                                    // 5. access points value of that elemement with matching genre
                                                    // 6. check if the points === 0
                                                    console.log(genre_points[j].genre + " points is " + genre_points[j].points);
                                                    if (genre_points[j].points === 0){
                                                        // 7. if so then skip to next
                                                        console.log(genre_points[j].genre + " points is 0, it works!");
                                                        
                                                        spotifyApi.skipToNext()
                                                        .then(function() {
                                                            console.log('Skip to next');
                                                        }, function(err) {
                                                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                                            console.log('Something went wrong!', err);
                                                        });
                                                    }
                                                    else{
                                                        // else do nothing and finish like song method
                                                        // Start/Resume a User's Playback 
                                                        spotifyApi.play()
                                                        .then(function() {
                                                            console.log(genre_points[j].genre + " is currently playng");
                                                            console.log('Playback started');
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
                    });
                }, function(err) {
                console.log('Something went wrong addTracksToPlaylist()!', err);
                })

                

                

                }, function(err) {
                    console.log('Something went wrong!', err);
            })
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
            </header>

            <button className="like" onClick={likeSong}>Like Song</button>

            <div>
                {
                    !token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout} >Logout</button>}

                    {token ?
                        <div>
                            <h1>Select genres</h1>
                            <button onClick={() => setCreatedSongList(true)}>Create Song Container</button>
                        </div>
                        : <h2>Please login</h2>
                    }
            </div>
      
            <div>
                {console.log(11)}
                {console.log("playback")}
                {console.log(playlistUris)}
                <Playback token={token} uris="test" proponent={playlistUris} />
            </div>
        </div>
    );
};

export default TEST;