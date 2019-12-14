import React, { useState, useEffect } from 'react';

import {getTournamentById} from '../../../FetchClient';

export default function Tournament(props) {
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    if(!tournament) {
      const { id } = props.location.state;
      console.log(id)
      getTournamentById(id, tournament => {
        if(tournament){
          console.log(tournament)
          setTournament(tournament);
        }
      })
    }
  });

  return (
    !tournament
    ? <p>No tournament found!</p>
    : <div className="tournament">
        <p>{tournament.name}</p>
        <p>{tournament.date}</p>
      </div>
  );
}
