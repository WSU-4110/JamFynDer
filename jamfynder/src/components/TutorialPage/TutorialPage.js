import React, { useState, useEffect } from "react";
import "./TutorialPage.css"
import "./Dropdown.js"
import Dropdown from "./Dropdown.js";
import axios from 'axios'




const TutorialPage = () => {
     

    const clientID = "8bc35a75fa824f0b9ff3d0683c05fa82"
    const secret = "ba291791b4854e7ba6fdd7a3abbb0814"

    const data = [ 
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C'},
      ]; 
 
      const [token, setToken] = useState('');
      const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
      const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
      const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});

      useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientID + ':' + secret)      
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
            })
            .then(tokenResponse => {       
            setToken(tokenResponse.data.access_token);
            

            axios('https://api.spotify.com/v1/browse/categories?country=US', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
              })
              .then (genreResponse => {        
                setGenres({
                  selectedGenre: genres.selectedGenre, 
                  listOfGenresFromAPI: genreResponse.data.categories.items
                })
              });
            });


      }, [genres.selectedGenre, clientID, secret]);

      const genreChanged = val => {
        setGenres({
          selectedGenre: val, 
          listOfGenresFromAPI: genres.listOfGenresFromAPI
        });

        axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
          })
          .then(playlistResponse => {
            setPlaylist({
              selectedPlaylist: playlist.selectedPlaylist,
              listOfPlaylistFromAPI: playlistResponse.data.playlists.items
            })
          });

      }

      const playlistChanged = val => {
        console.log(val);
        setPlaylist({
          selectedPlaylist: val,
          listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        });
      }

      const buttonClicked = e => {
          e.preventDefault();
      
          axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
            method: 'GET',
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          })
          .then(tracksResponse => {
            setTracks({
              selectedTrack: tracks.selectedTrack,
              listOfTracksFromAPI: tracksResponse.data.items
            })
          });
      }


    return(/** 
        <div className="TutorialPage">
            <div className="row">
                <div className="column">
                    <h1>Don't know where to start?</h1>
                    <p>Watch the tutorial</p>
                    
                </div>
                <div className="column">
                <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>   
                </div>
            </div>
        </div>
        */
       <form onSubmit={() => {}}>
          <div className="container">
          <Dropdown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedValue} changed={genreChanged}/>
          <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          <button type="submit">
            Submit
          </button>
        </div>
       </form>
       
    );
}

export default TutorialPage;