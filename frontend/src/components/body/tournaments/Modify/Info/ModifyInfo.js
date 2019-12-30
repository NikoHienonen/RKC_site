import React, { useContext, useState, useEffect } from 'react';

import { TournamentContext } from '../../../../utilities/TournamentContext';
import NoTournament from '../../../../static/NoTournament';
import InfoForm from './InfoForm';

export default function ModifyInfo(props) {
  const [tournament, setTournament] = useState(null);
  const context = useContext(TournamentContext);
  const { getTournamentById } = context;

  useEffect(() => {
    if(!tournament) {
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
  
  return(
    <div className="generic-container">
    {!tournament 
      ? <NoTournament/>
      : <InfoForm tournament={tournament} id={tournament._id} navigate={navigate}/>
    }
    </div>
  )
}
