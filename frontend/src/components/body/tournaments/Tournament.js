import React, { Component } from 'react';
import { Consumer } from '../../../context';

class Tournament extends Component {
  render() {
    return (
      <div className="tournament">
        {this.props.tournament.name}
      </div>
    );
  }
}

export default Tournament;