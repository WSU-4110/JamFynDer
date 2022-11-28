import React, { useState, useEffect } from 'react';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'JamFynder',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                
                // Patrick's Addition to transfer playback device using /me/player endpoint
                // --------------------------------------------
                fetch("https://api.spotify.com/v1/me/player", 
                {   method: 'PUT', // PUT method
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.token}, // headers required for API
                    body: JSON.stringify({device_ids: [`${device_id}`], play: true}) // Use SDK id for device_ids param and set play to true
                })
                // --------------------------------------------
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, []);

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
    test();
}

function test(){
    console.log("test")
}

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>
                            <h2>Likes/Dislikes {likeS}</h2>
                            <button className="btn-spotify" onClick={() => { player.nextTrack(dislikeSong()) }} >
                                Dislike
                            </button>

                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                        
                            <button className="btn-spotify" onClick={() => { player.nextTrack(likeSong()) }} >
                                Like
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback
