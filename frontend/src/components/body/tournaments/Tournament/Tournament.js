import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TournamentMenu from './TournamentMenu';

export default class Tournament extends Component {
  constructor(props){
    super(props);
    this.state={
      tournament: {}
    }
  }
  componentDidMount(){
    this.setTheTournament();
  }
  setTheTournament = () => {
    let tournament = this.props.location.state.tournament;
    if(tournament){
      this.setState({tournament});
    }
  }
  render() {
    if(this.state.tournament){
      console.log('teams: '+tournament.teams)
      const { name, date, location, teams} = this.state.tournament;
      let newDate = new Date(date);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return (
        <div className="tournament-panel">
          <TournamentMenu tournament={this.state.tournament}/>
          
          <h2>{name}</h2>
          <p>{newDate.toLocaleDateString('fi-US', options)}</p>
          <p>{location}</p>
          <p>{teams[0]}</p>
          <Route to="/matches">Matches</Route>
        </div>
      )
    } else {
      return (
        <div>
          <p>Ei turnausta tällä nimellä.</p>
        </div>
      )
    }
  }
}
