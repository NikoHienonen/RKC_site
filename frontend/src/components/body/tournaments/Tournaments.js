import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={"/tournaments/"+tournament._id}>
        <li><Tournament tournament={tournament}/></li>
      </Link>
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