import React, { useContext, Fragment } from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import NoTournament from '../../../../static/NoTournament';
import AddTeam from './AddTeam';
import Team from './Team';
import Back from '../../../../static/Back';

export default function ModifyTeams(props) {
  const empty_values = {
    name: ''
  }
  const context = useContext(TournamentContext);
  const { tournament } = context;
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
                {tournament.teams.map(team => <Team team={team} id={tournament._id}/>)}
              </ul>
          }
          <AddTeam INITIAL_VALUES={empty_values} _id={tournament._id} props={props}/>
        </div>
        <Back link={`/turnaukset/${tournament.name}/muokkaa/`}/>
      </Fragment>
    }
      
      {/*!values.teams 
        ? <p>No teams yet!</p> 
      : <ul>{values.teams.map((team, i) => <li key={i}>{team.name}</li>)}</ul>
      }
      <label>
        Add New Team:
        <input value={values.team} onChange={handleChange} 
        onBlur={handleBlur} type="text" name="team"/>
      </label>
      <button onClick={addTeam}>Add</button>
    {errors.team && <p className="error-text">{errors.team}</p>*/}
    </div>
  );
}
