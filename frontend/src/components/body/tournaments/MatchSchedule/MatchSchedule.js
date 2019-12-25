import React, { useContext, Fragment } from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back';

export default function MatchSchedule() {
  const context = useContext(TournamentContext);
  const { tournament } = context;
  return (
    <div className="mb3-container">
      {!tournament
      ? <NoTournament/>
      :<Fragment>
        <h1>Otteluohjelma</h1>
        <Back link={`/turnaukset/${tournament.name}/`}/>
      </Fragment>
    }
    </div>
  );
}
