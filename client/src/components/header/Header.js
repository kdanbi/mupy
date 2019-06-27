import React from 'react';
import '../chat/chat.scss';
import headerLeft from './header-left.svg';
import headerRight from './group.svg';
import { Link } from 'react-router-dom';

let ChatHeader = props => {
    return (
      <div className="chat-header">
            <Link to="/"><img className="chat-header__left" src={headerLeft} alt="app logo" /></Link>
            <img className="chat-header__right" src={headerRight} alt="app logo" />
      </div>
    );
  };

export default ChatHeader;