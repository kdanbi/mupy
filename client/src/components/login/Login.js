//WORK IN PROGRESS
import React from 'react';
import '../login/login.scss';
//import { Link } from 'react-router-dom';

let ChatHeader = props => {
    return (
        <div className="container">
            <div id="login">
                <a href="/login" className="btn btn-primary">Connecting to Spotify..</a>
            </div>
        </div>
    );
  };

export default ChatHeader;