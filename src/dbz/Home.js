import React from 'react';
import { NavLink } from 'react-router-dom'
import bgImageLQ from './img/sonLQ.png'
import bgImageHQ from './img/sonHQ.png'
import logo from './img/logo.png'


class Home extends React.Component {
  state = {
    loaded: false
  }

  render() {

    return (
      <div className="bodyHome">
        <div className="sonBgc">
          <img src={this.state.loaded ? bgImageHQ : bgImageLQ} alt="songoku" />
          <img onLoad={() => this.setState({ loaded: true })} style={{ display: 'none' }} src={bgImageHQ} alt="songoku" />
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav">
          <div><NavLink to={`${this.props.url}/1gracz`}>1 gracz</NavLink></div>
          <div><NavLink to={`${this.props.url}/2graczy`}>2 graczy</NavLink></div>
        </div>
      </div>
    );
  }
}

export default Home;