import React, { useContext, Fragment } from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back'; 
import StandingsTable from './StandingsTable';

export default function Standings(props) {
  const context = useContext(TournamentContext);
  const { tournament } = context;
  return (
    <div className="mb3-container">
      <h1>Sarjataulukko</h1>
      {!tournament
      ? <NoTournament/>
      : !tournament.teams || tournament.teams.length === 0
      ? <Fragment>
          <div className="m3-container">
            <p>Turnauksessa ei ole vielä joukkueita.</p>
          </div>
          <button onClick={() => props.history.goBack()}>
            Palaa
          </button>
        </Fragment>
      : <Fragment>
      <StandingsTable teams={tournament.teams}/>
      <Back link={`/turnaukset/${tournament.name}/`}/>
    </Fragment>
    }
    </div>
  );
}
