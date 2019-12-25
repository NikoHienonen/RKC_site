import React, { Component } from 'react';
import Footer from '../static/Footer';

class Landing extends Component {
  render() {
    return (
      <div>
          <div className="landing">
          <img src="./assets/img/logo.png"/>
          <h1>Lentopallopalvelut</h1>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Landing;