import React from 'react';
import { TournamentContext } from './TournamentContext';
import { getTournamentById } from './FetchClient';
import  {getTournaments } from './FetchClient';

const Provider = props => {
  const setTournamentId = (id) => {
    sessionStorage.setItem('tournamentId', id);
  }
  return (
    <TournamentContext.Provider
      value={{
        setTournamentId: setTournamentId,
        getTournamentById: getTournamentById,
        getTournaments: getTournaments
      }}
    >
      {props.children}
    </TournamentContext.Provider>
  )
}

export default Provider;