import React from 'react';
import { Consumer } from '../../../context';

import Tournaments from './Tournaments';

const TournamentManager = () => {
  return (
    <Consumer>
      {value => {
        return (
          <Tournaments value={value}/>
        )
      }}
    </Consumer>
  );
};

export default TournamentManager;