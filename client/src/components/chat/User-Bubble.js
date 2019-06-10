import React from 'react';
import './chat.scss';

export default class UserBubble extends React.Component {
    render() {
      return (
        <div className="user-message-container" ref={this.props.thisRef}>
          <div className="chat-bubble user">
            {this.props.message}
          </div>
        </div>
      );
    }
  }