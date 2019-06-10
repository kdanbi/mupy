import React, { Component } from 'react';
import '../../App.scss';
//import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyWebApiNode from 'spotify-web-api-node';

var spotifyApi = new SpotifyWebApiNode({
  clientId: 'f5e8e6f86fdd4361a33a3daaa5bcf808',
  clientSecret: '71a41656726a455a9cc526e9cbf2b168',
  redirectUri: 'http://localhost:8888/callback'
});

export default class Player extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }
  render() {
    spotifyApi.searchPlaylists('stressed')
    .then(function(data) {
      console.log('Found playlists are', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return (
		<div className="player__loginPage">
			<a href='http://localhost:8888'> Login to Spotify </a>
		</div>
    );
  }
}