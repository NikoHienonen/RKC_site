import React, {useState, useEffect, useContext} from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import NoTournament from '../../../../static/NoTournament';
import { getTournamentById } from '../../../../utilities/FetchClient';
import Back from '../../../../static/Back';

import MatchesList from './MatchesList';

export default function ModifyMatches() {
  const {tournament} = useContext(TournamentContext);
  const [myTournament, setMyTournament] = useState(tournament);
  console.log(myTournament);

  useEffect(() => {
    getTournamentById(tournament._id, result => {
      setMyTournament(result);
    })
  }, [])

  return (
    <div>
      <div>
        <h1>Muokkaa otteluita</h1>
        <MatchesList matches={tournament.matches}/>
      </div>
      <Back link="/turnaukset"/>
    </div>
  );
}
