import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/landing/Landing.js";
import Chat from "./components/chat/Chat.js";
//import Main from './components/Main.js';

//const pingURL = `${process.env.REACT_AOO_BACKEND_SERVER || 'http://localhost8080.com'}/ping`

class App extends React.Component {
  render() {
    return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/chat" component={Chat} />
				</Switch>
			</div>
		</BrowserRouter>
  	);
}
}

export default App;
