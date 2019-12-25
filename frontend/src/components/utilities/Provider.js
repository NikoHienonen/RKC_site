import React, { useState } from 'react';
import { TournamentContext } from './TournamentContext';

const Provider = props => {
  const [state, setState] = useState(null);
  return (
    <TournamentContext.Provider
      value={{
        tournament: state,
        setTournament: (tournament) => {
          setState(tournament);
        }
      }}
    >
      {props.children}
    </TournamentContext.Provider>
  )
}

export default Provider;