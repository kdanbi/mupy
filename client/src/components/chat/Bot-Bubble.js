import React from 'react';
import './chat.scss';
  
export default class BotBubble extends React.Component {
    render() {
        return (
        <div className="bot-message-container" ref={this.props.thisRef}>
            <div className="bot-avatar" />
            <div className="chat-bubble bot">
            {this.props.message}
            </div>
        </div>
        );
    }
}