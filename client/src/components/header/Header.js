import React from 'react';
import '../chat/chat.scss';
import logo from './logo.svg';

let ChatHeader = props => {
    return (
      <div className="chat-header">
        <div>
            <img src={logo} alt="app logo" />
        </div>
      </div>
    );
  };

export default ChatHeader;