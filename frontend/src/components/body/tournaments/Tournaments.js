import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {getTournaments} from '../../../components/utilities/FetchClient';

export default function Tournaments(props) {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    if(tournaments.length === 0) {
      getTournaments(tournaments => {
        console.log(tournaments)
        if(tournaments){
          console.log(tournaments)
          setTournaments(tournaments);
        }
      })
    }
  });
  
  return (
    <div>
      { tournaments.length === 0
      ? <p>No tournaments yet!</p>
      : (
      <div className="tournaments">
        <ul>
          {tournaments.map(tournament => 
            <li key ={tournament._id}>
              <Link to={{pathname: `/turnaukset/${tournament.name}`, state: {id: tournament._id}}} >
                {tournament.name}
              </Link>
            </li>
          )}
        </ul>
      </div>
    )}
    <Link to={'/turnaukset/uusi'}>Lisää uusi</Link>
  </div>)
}
