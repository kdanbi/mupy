import React from 'react';
import '../chat/chat.scss';
import logo from './mupy_logo.svg';
import mupy from './mupy_name.svg';

let ChatHeader = props => {
    return (
      <div className="chat-header">
            <img className="chat-header__logo" src={logo} alt="app logo" />
            <img className="chat-header__name" src={mupy} alt="app logo" />
      </div>
    );
  };

export default ChatHeader;