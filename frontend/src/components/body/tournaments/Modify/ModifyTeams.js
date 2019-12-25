import React, { useContext, useState, Fragment } from 'react';

import { deleteTeam } from '../../../utilities/FetchClient';
import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import AddTeam from './AddTeam';

export default function ModifyTeams() {
  const context = useContext(TournamentContext);
  const [add, toggleAdd] = useState(false);
  const [fetchDone, toggleFetchDone] = useState(false);
  const { tournament } = context;
  return (
    <div className="m3-container">
      {!tournament
      ? <NoTournament />
      : <Fragment>
        <h1>
          Muokkaa joukkueita
        </h1>
        <div className="teams">
          {
            !tournament.teams
            ? <p>Ei joukkueita vielä!</p>
            : <ul>
                {tournament.teams.map(team => <li key={team._id}>
                  {team.name}
                  <button>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => {
                    deleteTeam(tournament._id, team._id, result => {
                      toggleFetchDone(result);
                    });
                  }}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </li>)}
              </ul>
          }
          <AddTeam add={add} toggleAdd={toggleAdd}/>
        </div>
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
