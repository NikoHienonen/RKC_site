import React, {useContext} from 'react';

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
  const context = useContext(TournamentContext);
  const { tournament } = context;
  return (
    <div>
      <h1>Muokkaa tuomareita</h1>
      <div>
        {
          !tournament 
          ? <NoTournament/>
          : <div>
            {!tournament.referees ||tournament.referees.length === 0
            ? <p>Ei tuomareita</p>
            :<ul>
              {tournament.referees.map((referee, index) => 
                <li key={index}>
                  <Referee referee={referee} id={tournament._id}/>
                </li>
              )}
            </ul>
            }
            <AddReferee INITIAL_VALUES={empty_values} _id={tournament._id} props={props}/>
            <Back link={`/turnaukset/${tournament.name}/muokkaa/`}/>
          </div>
        }
      </div>
    </div>
  );
}
