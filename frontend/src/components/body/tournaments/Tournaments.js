import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../../utilities/TournamentContext';

export default function Tournaments(props) {
  const [tournaments, setTournaments] = useState([]);
  const context = useContext(TournamentContext);
  const { getTournaments } = context;

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
                      context.setTournamentId(tournament._id);
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
