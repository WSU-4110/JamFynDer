import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

export default function Playback({ token, trackUri }) {
    console.log("testing")
    console.log(trackUri)
    return (<SpotifyPlayer 
    token={token}
    uris={"spotify:album:4yP0hdKOZPNshxUOjY0cZj"}
    />
    )
}

