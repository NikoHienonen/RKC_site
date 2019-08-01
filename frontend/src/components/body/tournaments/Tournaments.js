import React, { Component } from 'react';

import Tournament from './Tournament';

class Tournaments extends Component {
  state = {fetchSuccess: false, tournaments: []}
  componentDidMount(){
    this.getTournaments();
  }
  getTournaments = () => {
    this.props.getTournaments(tournaments => {
      console.log(tournaments);
      if(tournaments) {
        this.setState({fetchSuccess: true});
        this.createTournamentTable(tournaments);
      }
    })
  }
  createTournamentTable = (tournaments) => {
    const tournamentTable = tournaments.map(tournament => 
      <li><Tournament tournament={tournament}/></li>
    )
    this.setState({tournaments: tournamentTable});
  }
  renderTournaments = () => {
    console.log(this.state.tournaments)
    return (
      <div className="tournaments">
        <ul>
          {this.state.tournaments}
        </ul>
      </div>
    );
  }
  render() {
    return this.state.fetchSuccess === true
    ? this.renderTournaments()
    : <p>No tournaments yet!</p>;
  }
}

export default Tournaments;