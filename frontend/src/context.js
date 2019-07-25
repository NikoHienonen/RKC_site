import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_TOURNAMENT':
      return {
        ...state,
        tournaments: state.tournaments.filter(tournament =>
          tournament.id !== action.payload)
      }
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    tournaments: []
    , dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  }
  componentDidMount() {
    this.callTournaments();
  }
  callTournaments = () => {
    axios.get('/api/tournaments')
    .then(tournaments => {
      this.setState({tournaments});
    })
    .catch(err => console.log(err));
  }
  render() {
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;