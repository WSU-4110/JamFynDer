import React, { useState, useEffect } from "react";
import "./TEST.css";
import PlaylistSearch from "./PlaylistSearch.js"
import SpotifyWebApi from "spotify-web-api-node"
import Playback from "./Playback";

const TEST = () => {
    //GLOBAL CONSTANTS
    const CLIENT_ID = "8bc35a75fa824f0b9ff3d0683c05fa82"
    const REDIRECT_URI = "http://localhost:3000/TEST"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const SPACE_DELIMITER = "%20";
    const SCOPES = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
            ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    const RESPONSE_TYPE = "token"

    //usestate methods used to store and manipulate data. Mainly Uri's
    const [token, setToken] = useState("")
    const [genreType, setGenreType] = useState()
    const [playlistObject, setPlaylistObject] = useState([])
    const [playlistUri, setPlaylistUri] = useState([])

    //creating a SpotifyWebApi object to use api calls from spotify-web-node library
    const spotifyApi = new SpotifyWebApi({
        clientId: "8bc35a75fa824f0b9ff3d0683c05fa82"
        })

        //useeffect for authentication
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

    //setting the access token for the object so we can use api calls
    spotifyApi.setAccessToken(token);

    //main use effect hook. Changes on genretype update
    useEffect(() => {
        

        //if the gernretype is R&B (more testing needed)
        if(genreType == "R&B"){
            //are&be playlist on Spotify https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=a103d0b91f934379
            spotifyApi.getPlaylist("37i9dQZF1DX4SBhb3fqCJd")
            .then(res => {
                
                console.log(res)
                setPlaylistObject(
                res.body.tracks.items.map(track => {
                    return {
                        artist: track.track.artists[0].name,
                        title: track.track.name, 
                        uri: track.track.uri,
                        albumPic: track.track.album.images[1].url
                    }
                })
                )

            })
        }




        


        //if genreType is HipHop
        if(genreType == "HipHop"){
            //are&be playlist on Spotify https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=a103d0b91f934379
            //use the api call to get the playlist
            spotifyApi.getPlaylist("37i9dQZF1DX0XUsuxWHRQd")
            //testing how to pull out the track information
            .then(res => {
                console.log(res)
                setPlaylistObject(
                res.body.tracks.items.map(track => {
                    return {
                        artist: track.track.artists[0].name,
                        title: track.track.name, 
                        uri: track.track.uri,
                        albumPic: track.track.album.images[1].url
                    }
                })
                )

                // setPlaylistUri(
                //     res.body.tracks.items.map(trackUri => {
                //         // const temp2 = trackUri.track.uri
                //         // const temp = JSON.parse(temp2)
                //         return {
                //             trackUri: trackUri.track.uri
                //         }

                //     })
                // )

                    // for(i = 0; i < 25; i++){
                    //     //d['genre', 'uri']
                    //     d[genreType, res.body.tracks.items[i].track.uri]
                        
                    // }

                    //taking the track uris, and storing them into the global array
                    res.body.tracks.items.map(trackInfo => {
                        playlistUri.push(trackInfo.track.uri)
                        

                    })
                

            })

            //testing api calls
            spotifyApi.getMe()
            .then(function(data) {
                console.log('Some information about the authenticated user', data.body);
                console.log(token)
                
            }, function(err) {
                console.log('Something went wrong!', err);
            });



        }



    }, [genreType])



    //for logging out
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    //logging out the playlistUri to confirm the uri's are stores correctly
    console.log(playlistUri)
    
    










    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
            </header>
            <div>
            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout} >Logout</button>}

                 {token ?
                    <div>
                        <button onClick={() => setGenreType('R&B')}>RnB</button>
                        <button onClick={() => setGenreType('HipHop')}>HipHop</button>
                    </div>

                    : <h2>Please login</h2>
                }
            </div>
            {/* <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                    {playlistObject.map(track => (
                    <PlaylistSearch track={track} key={track.uri} />
                    ))}
                    
      </div> */}
      
      <div>
        
        {/* {playlistUri.map((trackUri, index) => (
            <Playback token={token} trackUri={trackUri.uri}/>
        ))} */}
        <Playback token={token} uris="test" proponent={playlistUri} />

        
            
        
        
      </div>
        </div>
    );
};

export default TEST;