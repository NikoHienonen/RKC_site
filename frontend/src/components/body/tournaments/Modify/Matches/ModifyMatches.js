import React, {useState, useEffect, useContext, Fragment} from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import NoTournament from '../../../../static/NoTournament';
import Back from '../../../../static/Back';
import { deleteMatchById } from '../../../../utilities/FetchClient';

import MatchesTable from './MatchesTable';
import AddMatch from './AddMatch';

export default function ModifyMatches(props) {
  const [tournament, setTournament] = useState(null);
  const context = useContext(TournamentContext);
  const { getTournamentById } = context;

  useEffect(() => {
    if(!tournament ) {
      const tournamentId = sessionStorage.getItem('tournamentId');
      if(tournamentId) {
        getTournamentById(tournamentId, (result) => {
          setTournament(result);
        })
      }
    }
  });

  const navigate = () => {
    props.history.push(`/turnaukset/${tournament.name}/`);
  }
  
  const toggleRefresh = () => {
    window.location.reload();
  }

  return (
    <div>
      <h1>Muokkaa otteluita</h1>
        {
          !tournament
            ? <NoTournament/>
            : <Fragment>
                {
                  !tournament.matches || tournament.matches.length === 0 
                    ? <p>Ei otteluita vielä!</p>
                    : <MatchesTable matches={tournament.matches} deleteMatchById={deleteMatchById}
                    toggleRefresh={toggleRefresh} id={tournament._id} />
                }
                <div className="m3-container">
                {
                  !tournament.teams || tournament.teams.length === 0 
                    ? <h3>Ottelun lisäämiseen vaaditaan joukkueita, lisää niitä ensin</h3>
                    : !tournament.referees || tournament.referees.length === 0
                      ? <h3>Ottelun lisäämiseen vaaditaan vähintään yksi tuomari, lisää se ensin</h3>
                      : <AddMatch tournament={tournament} toggleRefresh={toggleRefresh} 
                      navigate={navigate}/>
                }
                </div>
                <div className="m3-container">
                  <Back link={`/turnaukset/${tournament.name}/muokkaa/`}/>
                </div>
            </Fragment>
        }
    </div>
  );
}
