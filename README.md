# Welcome to the JamFynDer wiki!
JamFynDer is a user-friendly music streaming web application that helps users discover new music most suited to their daily listening habits.
Our goal is to ensure you are given the best experience listening to your favorite latest hits!

Our members:
* Ali Janbeih
* Michael Tocco
* Chris Wilson
* Henry Winczner
* Mo Razzaq
* Jacob Arslanian

Technology Stack:
* Node.js
* React
* Express.js
* HTML/CSS

Project Backlog:
* [Link to project backlog](https://github.com/orgs/WSU-4110/projects/6)

Software Design:
* BEHAVIORAL DESIGN - chain of responsibility, iterator
* created using react, a JavaScript library
* use of [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) and [react-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback)
* passing a request along a chain of handlers, in this case the handlers are the api calls and business logic within the chained .then() methods
* need to give the spotifyApi instance the access token to run further API calls
* populate system dictionary with song uris
* when responsibility is given to api, we need to wait for a request which is why we use the settime() method to give the api time to respond
* communication occurring between system data structures as well as the spotify api responses
* dictionary to hold the genres and their respective points
* algorithm to determine if next song should be played using the genre points
* points can increase and decrease 
* spotifyApi calls to handle things such as fetching current song, adding songs to playlist, skipping to next song

