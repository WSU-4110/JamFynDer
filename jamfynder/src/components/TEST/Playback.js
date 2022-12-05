import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

export default function Playback({ token, trackUri, proponent }) {
    // const cars = ["spotify:track:1cKHdTo9u0ZymJdPGSh6nq", "spotify:track:4EDijkJdHBZZ0GwJ12iTAj",
    //  "spotify:track:4mU5iXHeLgbR94siF7p1sY", "spotify:track:7J1uxwnxfQLu4APicE5Rnj", "spotify:track:4FyesJzVpA39hbYvcseO2d"
    // ];
    //const cars2=[trackUri]

    // console.log(token)
    // console.log(cars)
    // console.log(proponent)
    const copy = [...proponent];
    // console.log(copy)
    return (
        <SpotifyPlayer 
            token={token}
            uris={copy}
            autoPlay={true}
        />
    )
}

// https://open.spotify.com/track/1cKHdTo9u0ZymJdPGSh6nq?si=51e6290c037e48e5
// https://open.spotify.com/track/4EDijkJdHBZZ0GwJ12iTAj?si=ef68422a69a140ff
// https://open.spotify.com/track/4mU5iXHeLgbR94siF7p1sY?si=cdb6a9f6d3194f0f
// https://open.spotify.com/track/7J1uxwnxfQLu4APicE5Rnj?si=bb2c24f61a844ea6
// https://open.spotify.com/track/17aGT7e1IdiOnOV6ymqghb?si=45f7bb214eb34314
