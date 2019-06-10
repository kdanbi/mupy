import React from 'react';
import Typist from 'react-typist';
import './landing.scss';
import '../../App.scss';
import { Link } from 'react-router-dom';

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
                    <h1 className="landing-page__input--question">What's your name?</h1>
                    <form className="landing-page__form" onSubmit={this.handleSubmit}>
                        <input className="landing-page__form--name" type="text" name="name" ref={(input) => this.input = input} placeholder="You Name Here"></input>
                        <Link to={{ pathname: "/player", state: {username: this.state.user_name} }} ><input className="landing-page__form--button" type="submit" value="NEXT" /></Link>
                    </form>
                </section>
            ) :
            (            
            <section className="landing-page">
            <Typist className="landing-page__introduction">
                <span className="landing-page__introduction--partA">Heeey you!</span>
                <Typist.Backspace count={13} delay={1000} />
                <span className="landing-page__introduction--partA">I am your music therapy bot!</span>
                <Typist.Backspace count={23} delay={1000} />
                <span className='landing-page__introduction--partC'>mupy!</span>
            </Typist>
            <button className="landing-page__button" type="click" onClick={this.changeState}>Get Started!</button>
            </section>
        )
        )
    }
}

