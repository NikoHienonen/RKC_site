import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
  getTournaments = (callback) => {
    axios.get('/api/tournaments')
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