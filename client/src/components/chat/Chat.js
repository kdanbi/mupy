import React from "react";
import "./chat.scss";
import ChatHeader from "../header/Header";
import BotBubble from "./Bot-Bubble";
import UserBubble from "./User-Bubble";
import SpotifyWebApiNode from "spotify-web-api-node";

let spotifyApi = new SpotifyWebApiNode({
  clientId: "f5e8e6f86fdd4361a33a3daaa5bcf808",
  clientSecret: "71a41656726a455a9cc526e9cbf2b168",
  redirectUri: "http://localhost:8888/callback"
});

let data = {
  userMessages: [],
  botMessages: [],
  botGreeting: `Hi I'm mupy - your music therapy bot! What's your name?`,
  botLoading: false,
  moodIdentifier: [],
  spotifyURL: "",
  shouldContinue: false
};

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  //authentication
  componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  //Function adds user and bot messages to state
  updateUserMessages = newMessage => {
    //newMessage === userInput
    if (!newMessage) {
      return;
    }
    let updatedMessages = this.state.userMessages;
    let updatedBotMessages = this.state.botMessages;
    this.setState({
      userMessages: updatedMessages.concat(newMessage), //adds every user message entered to userMessages in state
      botLoading: true,
      newMessage: newMessage,
      shouldContinue: true
    });

    let request = new Request(
      "https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=" +
        newMessage +
        "&sessionId=12345",
      {
        headers: new Headers({
          Authorization: "Bearer 09b0b56442394d17907d2f63d856faf2"
        })
      }
    );

    fetch(request)
      .then(response => response.json())
      .then(json => {
        let botResponse = json.result.fulfillment.speech;
        let currentMood = Object.keys(json.result.parameters);
        this.setState({
          botMessages: updatedBotMessages.concat(botResponse),
          botLoading: false,
          moodIdentifier: currentMood
        });
      })
      .catch(error => {
        console.log("ERROR:", error);
        this.setState({
          botMessages: updatedBotMessages.concat("?"),
          botLoading: false
        });
      });
  };

  //scroll to view
  scrollBubble = element => {
    if (element != null) {
      element.scrollIntoView(true);
    }
  };

  //display msgs in state by pushing components into allMessages array
  showMessages = () => {
    let userMessages = this.state.userMessages;
    let botMessages = this.state.botMessages;

    let allMessages = [];
    let i = 0; //line 98
    for (; i < userMessages.length; i++) {
      if (i === userMessages.length - 1) {
        if (botMessages[i]) {
          //if last msg was from bot
          allMessages.push(<UserBubble message={userMessages[i]} />);
          allMessages.push(
            <BotBubble message={botMessages[i]} thisRef={this.scrollBubble} />
          );
        } else {
          allMessages.push(
            //if last msg was from user
            <UserBubble message={userMessages[i]} thisRef={this.scrollBubble} />
          );
        }
        break;
      }
      //if message is not the last message then push user and bot components to allMessages
      allMessages.push(<UserBubble message={userMessages[i]} />);
      allMessages.push(<BotBubble message={botMessages[i]} />);
    }

    allMessages.unshift(
      //include greeting
      <BotBubble
        message={this.state.botGreeting}
        thisRef={i === 0 ? this.scrollBubble : ""}
      />
    );

    return <div className="msg-container">{allMessages}</div>; //All messages displayed on chat
  };

  //Invoke updateUserMessages function passing in userInput as parameter
  onInput = event => {
    event.preventDefault();
    let userInput = event.target.message.value;
    //console.log(userInput)
    this.updateUserMessages(userInput);
    event.target.message.value = "";
  };

  componentDidUpdate = () => {
    let request = new Request(
      "https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=" +
        this.state.newMessage +
        "&sessionId=12345",
      {
        headers: new Headers({
          Authorization: "Bearer 09b0b56442394d17907d2f63d856faf2"
        })
      }
    );

    if (
      !this.state.moodIdentifier.length > 0 ||
      this.state.shouldContinue === true
    ) {
      fetch(request) //fetch mood keyword from DialogFlow
        .then(response => response.json())
        .then(json => {
          let currentMood = Object.keys(json.result.parameters);
          return currentMood;
        })
        .then(currentMood => {
          spotifyApi
            .searchPlaylists(currentMood.join(", ")) //query
            .then(data => {
              console.log("playlists", data.body.playlists.items);
              let num = Math.floor(
                Math.random() * data.body.playlists.items.length
              );
              console.log(data.body.playlists.items);
              let link = data.body.playlists.items[num].uri;
              let playlistID = link.slice(17);
              let spotifyURL = `https://open.spotify.com/embed/playlist/${playlistID}`;
              this.setState({
                spotifyURL: spotifyURL,
                moodIdentifier: currentMood,
                shouldContinue: false
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  };

  render() {
    console.log("mood", this.state.moodIdentifier);
    console.log("spotify", this.state.spotifyURL);
    return (
      <div className="app-container">
        <div className="chat-container">
          <ChatHeader />
          {this.showMessages()}
          <form onSubmit={this.onInput} className="input-container">
            <input
              id="chat"
              type="text"
              name="message"
              placeholder="Your message here."
            />
            <button type="submit" className="input-submit" />
          </form>
          <iframe
            title="this is unique"
            id="spotify"
            src={this.state.spotifyURL}
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </div>
      </div>
    );
  }
}
