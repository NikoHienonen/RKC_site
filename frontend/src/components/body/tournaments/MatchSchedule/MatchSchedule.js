import React, { useContext, Fragment } from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back';

import MatchTable from './MatchTable';

export default function MatchSchedule() {
  const context = useContext(TournamentContext);
  const { tournament } = context;
  return (
    <div>
      {!tournament
      ? <NoTournament/>
      :<Fragment>
        <div className="m3-container">
          <h1>Otteluohjelma</h1>
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
