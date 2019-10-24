import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
  state = {tournaments: []};
  getTournaments = (callback) => {
    axios.get('/api/tournaments')
    .then(response => {
      callback(response.data);
      this.setState({tournaments: response.data});
    })
    .catch(err => console.log(err));
  }
  getTournamentById = (id, callback) => {
    if(this.state.tournaments) {
      let array = this.state.tournaments.filter(tournament => tournament['_id']=== id);
      if(array.length > 0) {
        callback(array[0]);
      }
    }
  }
  getLogin = (callback) => {
    axios.get('users/login')
    .then(response => {
      callback(response.data);
    })
    .catch(err => console.log(err));
  }
  render() {
    return(
      <Context.Provider value={{getTournaments: this.getTournaments}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;