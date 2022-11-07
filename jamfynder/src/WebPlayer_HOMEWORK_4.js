/*
  Michael Tocco
  CSC 4110 Lab Assignment 4

  Singleton Design Pattern for Web Playback

  (Not able to implement without errors due to Spotify's API restrictions)
*/

class WebPlayer {
  currnetPlaylistURI = null;
  currentSongURI = null;
  newUserPlayListURI = null;

  connectToSpotifyAPI(authorizationCode, userName){
    connect_to_SpotifyAPI_Call(authorizationCode, userName);
  }

  pause(){
    Pause_Song_API_Call();
  }
  
  play(){
    play_Song_API_Call();
  }

  changePlaylist(){
    got_to_playlist_API_Call();
  }

  addSongToUserPlaylist(){
    Add_Song_to_user_playlist_API_Call(currentSongURI);
  }

  likeSong(){
    incrementPointForCurrentGenre();
    addSongToUserPlaylist();
    changePlaylist();
  }

  dislikeSong(){
    decrementPointForCurrentGenre();
    changePlaylist();
  }
}

