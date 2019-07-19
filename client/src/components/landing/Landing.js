import React from 'react';
import './landing.scss';
import '../../App.scss';
import logo from './mupy_logo.svg';
import mupy from './mupy_name.svg';
import posed from 'react-pose';

const heroku = "https://mupy-server.herokuapp.com";

const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  });

export default class Landing extends React.Component {
    state = {
        getStarted: false,
        isVisible: true
    }
    componentDidMount() {
        setInterval(() => {
          this.setState({ isVisible: !this.state.isVisible });
        }, 1000);
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
                        <img pose={this.state.isVisible ? 'visible' : 'hidden'} className="landing-page__partB---logo" src={mupy} alt="logo" />
                        <a className="landing-page__partB--intro" href={heroku}> Discover your sound</a>
                    </div>

                </section>
            ) :
            (            
            <section className="landing-page">
                <Box pose={this.state.isVisible ? 'visible' : 'hidden'} className="landing-page__partA">
                    <img className="landing-page__partA--logo" onClick={this.changeState} src={logo} alt="logo" />
                    <h2 className="landing-page__partA--intro">Music therapy anytime.</h2>
                </Box>
            </section>
        )
        )
    }
}