import React, { useState, useEffect, useContext, Fragment } from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back';

import MatchTable from './MatchTable';

export default function MatchSchedule() {
  const [tournament, setTournament] = useState(null);
  const context = useContext(TournamentContext);
  const { getTournamentById } = context;

  useEffect(() => {
    if(!tournament) {
      const tournamentId = sessionStorage.getItem('tournamentId');
      if(tournamentId) {
        getTournamentById(tournamentId, (result) => {
          console.log(result)
          setTournament(result);
        })
      }
    }
  }, [])
  return (
    <div>
      {!tournament
      ? <NoTournament/>
      :<Fragment>
        <h1>Otteluohjelma</h1>
        <div className="m3-container">
          {
            !tournament.matches || tournament.matches.length === 0
            ? <p>Turnauksessa ei ole vielä otteluita.</p>
            : <MatchTable matches={tournament.matches}/>
          }
        </div>
        <Back link={`/turnaukset/${tournament.name}/`}/>
      </Fragment>
    }
    </div>
  );
}
