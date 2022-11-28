import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

export default function Playback({ accesToken }) {
    return (<SpotifyPlayer 
    token={accesToken}
    uris={trackUri ? [trackUri] : []}
    
    />
    )
}