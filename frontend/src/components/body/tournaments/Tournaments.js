import React, { Component } from 'react';

import Tournament from './Tournament';

class Tournaments extends Component {
  state = {tournaments: []}
  componentDidMount(){
    this.setState({tournaments: this.props.tournaments})
  }
  renderTournaments = () => {
    const tournaments = this.state.tournaments.map(tournament => 
      <Tournament tournament={tournament}/>
    )
    return tournaments;
  }
  render() {
    return (
      <div className="tournaments">
        {this.renderTournaments()}
      </div>
    );
  }
}

export default Tournaments;