import React, { useContext, useState, useEffect, Fragment } from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import Back from '../../../../static/Back';
import NoTournament from '../../../../static/NoTournament';

import AddReferee from './AddReferee';
import Referee from './Referee';

export default function ModifyReferees(props) {
  const empty_values = {
    name: '',
    password:''
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
      <h1>Muokkaa tuomareita</h1>
      {!tournament
      ? <NoTournament />
      : <Fragment>
        <div className="teams">
        {
          !tournament.referees ||tournament.referees.length === 0
          ? <p>Ei tuomareita</p>
          : <ul>
              {tournament.referees.map((referee, index) => 
                <li key={index}>
                  <Referee referee={referee} id={tournament._id} toggleRefresh={toggleRefresh}/>
                </li>
              )}
            </ul>
        }
          <AddReferee INITIAL_VALUES={empty_values} _id={tournament._id} 
          toggleRefresh={toggleRefresh} navigate={navigate} />
        </div>
        <Back link={`/turnaukset/${tournament.name}/muokkaa/`}/>
      </Fragment>
    }
    </div>
  );
}
