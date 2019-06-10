import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/landing/Landing.js";
import Chat from "./components/chat/Chat.js";
//import Main from './components/Main.js';
import Player from "./components/player/Player.js";

class App extends React.Component {
  render() {
    return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/chat" component={Chat} />
					<Route path="/player" component={Player}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}
}

export default App;
