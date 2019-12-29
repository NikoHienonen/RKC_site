import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../../utilities/TournamentContext';

import {getTournaments} from '../../../components/utilities/FetchClient';

export default function Tournaments(props) {
  const [tournaments, setTournaments] = useState([]);
  const context = useContext(TournamentContext);

  useEffect(() => {
    if(tournaments.length === 0) {
      getTournaments(tournaments => {
        if(tournaments){
          setTournaments(tournaments);
        }
      })
    }
  });

  return (
    <div>
      <h1>Turnaukset</h1>
      <div>
          { tournaments.length === 0
          ? <div className="m3-container">
              <p>Ei turnauksia vielä!</p>
            </div>
          : (
            <div className="tournaments">
              <ul>
                {tournaments.map(tournament => 
                  <li key={tournament._id}>
                    <button className="card" onClick={() => {
                      context.setTournament(tournament);
                      props.history.push('/turnaukset/'+tournament._id);
                    }}>
                      {tournament.name}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
          <Link to={'/turnaukset/uusi'}>Lisää uusi</Link>
        </div>
    </div>
  )
}
