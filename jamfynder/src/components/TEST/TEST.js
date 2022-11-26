import React, { useState, useEffect } from "react";
import "./TEST.css";
import SpotifyWebApi from "spotify-web-api-node"

const TEST = () => {
    const CLIENT_ID = "8bc35a75fa824f0b9ff3d0683c05fa82"
    const REDIRECT_URI = "http://localhost:3000/TEST"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    const spotifyApi = new SpotifyWebApi({
        clientId: "8bc35a75fa824f0b9ff3d0683c05fa82"
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

    useEffect(() => {

        spotifyApi.setAccessToken(token)

        console.log(token);

        spotifyApi.getArtistAlbums('4gzpq5DPGxSnKTe4SA8HAU')
  .then(function(data) {
    console.log('Artist albums', data.body.items[0]);
  }, function(err) {
    console.error(err);
  });
  //https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj?si=uR_WrH_DQ_iVfoLe7AIgag
        spotifyApi.getAlbum('4yP0hdKOZPNshxUOjY0cZj')
    .then(function(data) {
        console.log(data.body.artists[0].name);
    
    })
        

    }, [token])



    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }









    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout} >Logout</button>}

                {token ?
                    <form >
                        <input type="text"/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }

                

            </header>
        </div>
    );
};

export default TEST;