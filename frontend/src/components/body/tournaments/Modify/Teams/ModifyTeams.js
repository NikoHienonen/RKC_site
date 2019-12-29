import React, { useContext, Fragment, useState, useEffect } from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import NoTournament from '../../../../static/NoTournament';
import AddTeam from './AddTeam';
import Team from './Team';
import Back from '../../../../static/Back';

export default function ModifyTeams(props) {
  const empty_values = {
    name: ''
  }
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
  }, [])

  const navigate = () => {
    props.history.push(`/turnaukset/${tournament.name}/`);
  }
  
  const toggleRefresh = () => {
    window.location.reload();
  }

  return (
    <div>
      <h1>Muokkaa joukkueita</h1>
      {!tournament
      ? <NoTournament />
      : <Fragment>
        <div className="teams">
          {
            !tournament.teams || tournament.teams.length === 0
            ? <p>Ei joukkueita vielä!</p>
            : <ul>
                {tournament.teams.map(team => <Team team={team} id={tournament._id} 
                toggleRefresh={toggleRefresh} key1={team._id}/>)}
              </ul>
          }
          <AddTeam INITIAL_VALUES={empty_values} _id={tournament._id} 
          toggleRefresh={toggleRefresh} navigate={navigate} />
        </div>
        <Back link={`/turnaukset/${tournament.name}/muokkaa/`}/>
      </Fragment>
    }
    </div>
  );
}
