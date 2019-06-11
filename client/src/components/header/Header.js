import React from 'react';
import '../chat/chat.scss';
import headerLeft from './header-left.svg';
import headerRight from './group.svg';

let ChatHeader = props => {
    return (
      <div className="chat-header">
            <img className="chat-header__left" src={headerLeft} alt="app logo" />
            <img className="chat-header__right" src={headerRight} alt="app logo" />
      </div>
    );
  };

export default ChatHeader;