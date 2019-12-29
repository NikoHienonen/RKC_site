import React, { useContext, useState, useEffect }from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back';
import MenuButton from './MenuButton';

export default function Menu(props) {
  const [tournament, setTournament] = useState(null);
  const context = useContext(TournamentContext);
  const { getTournamentById } = context;

  useEffect(() => {
    if(!tournament) {
      const tournamentId = sessionStorage.getItem('tournamentId');
      if(tournamentId) {
        getTournamentById(tournamentId, (result) => {
          console.log(result)
          setTournament(result);
        })
      }
    }
  }, [])
  return (
    <div>
      {
        !tournament
        ? <NoTournament/>
        : <div className="modify-menu">
            <h1>Muokkaa turnausta: {tournament.name}</h1>
            <div className="menu-buttons">
              <MenuButton name={tournament.name} attribute="Yleinen"/>
              <MenuButton name={tournament.name} attribute="Joukkueet"/>
              <MenuButton name={tournament.name} attribute="Tuomarit"/>
              <MenuButton name={tournament.name} attribute="Ottelut"/>
            </div>
            <Back link={`/turnaukset/${tournament.name}`}/>
          </div>
      }
    </div>
  );
}
