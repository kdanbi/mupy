import React from 'react';
//import Typist from 'react-typist';
import './landing.scss';
import '../../App.scss';
import { Link } from 'react-router-dom';
import logo from './mupy_logo.svg';
import mupy from './mupy_name.svg';

export default class Landing extends React.Component {
    state = {
        getStarted: false,
        user_name: ''
    }
    changeState = () => {
        this.setState({getStarted: true})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ user_name: this.input.value }) //setState is always async; accepts callback function so console.log that way or use sync-await to synchroniously console.log afterwards.
    }
    render () {
        return (
            this.state.getStarted ? (
                <section className="landing-page">
                    <div className="landing-page__partB">
                        <img className="landing-page__partB---logo" src={mupy} alt="logo" />
                        <Link to="/player"><h2 className="landing-page__partB--intro">Discover your sound.</h2></Link>
                    </div>

                </section>
            ) :
            (            
            <section className="landing-page">
                <div className="landing-page__partA">
                    <img className="landing-page__partA--logo" onClick={this.changeState} src={logo} alt="logo" />
                    <h2 className="landing-page__partA--intro">Music therapy anytime.</h2>
                </div>
            </section>
        )
        )
    }
}

