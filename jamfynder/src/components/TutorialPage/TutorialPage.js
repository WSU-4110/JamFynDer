import React, { useState, useEffect } from "react";
import "./TutorialPage.css"
import "./Dropdown.js"
import Listbox from "./Listbox";
import Dropdown from "./Dropdown.js";
import axios from 'axios'
import Detail from "./Detail";



//function to conduct album search
const TutorialPage = () => {
     

    //clientID and secret needed for the api calls
    const clientID = "8bc35a75fa824f0b9ff3d0683c05fa82"
    const secret = "ba291791b4854e7ba6fdd7a3abbb0814"

    // const data = [ 
    //     {value: 1, name: 'A'},
    //     {value: 2, name: 'B'},
    //     {value: 3, name: 'C'},
    //   ]; 
 
    //usestate hooks to store data about the genres, playlists, tracks, etc
      const [token, setToken] = useState('');
      const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
      const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
      const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
      const [trackDetail, setTrackDetail] = useState(null);

      //useEffect hook, creates the access token and sets it as well as instantiates the fropdown with genres
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

      //when the genrechanges, then re-render
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

      //re-render on the playlist changed
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

      //when the listbox is clicked then the song information will come up
      const listboxClicked = val => {

          const currentTracks = [...tracks.listOfTracksFromAPI];
      
          const trackInfo = currentTracks.filter(t => t.track.id === val);
      
          setTrackDetail(trackInfo[0].track);

          

      }


    return(
       <form onSubmit={buttonClicked}>
          <div className="container">
          <Dropdown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedValue} changed={genreChanged}/>
          <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          <button type="submit">
            Submit
          </button>
        </div>
        <div className="row">
        <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} /> }
        </div>
       </form>
       
    );
}

export default TutorialPage;