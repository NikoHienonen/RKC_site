import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tournaments extends Component {
  state = {fetchSuccess: false, tournaments: []}
  componentDidMount(){
    this.getTournaments();
  }
  getTournaments = () => {
    this.props.getTournaments(tournaments => {
      if(tournaments) {
        this.setState({fetchSuccess: true});
        this.createTournamentTable(tournaments);
      }
    })
  }
  createTournamentTable = (tournaments) => {
    const tournamentTable = tournaments.map(tournament => 
      <li key={tournament._id}>
        <Link to={{pathname: "/tournaments/"+tournament.name,
          state: {
            tournament: tournament
          }}}>
            {tournament.name}
        </Link>
      </li>
    )
    this.setState({tournaments: tournamentTable});
  }
  renderTournaments = () => {
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