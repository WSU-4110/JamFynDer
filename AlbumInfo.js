import {AblumCover} from "react"
import Player from "./Player.js"
import SpotifyWebApi from "spotify-web-api-node"
import NavigationBar from "./NavigationBar.js"


AblumCover(() => {
    if (!Player) return    

    let cancel = false
    Player(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })