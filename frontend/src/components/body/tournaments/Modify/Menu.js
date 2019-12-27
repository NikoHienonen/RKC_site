import React, { useContext }from 'react';

import { TournamentContext } from '../../../utilities/TournamentContext';
import NoTournament from '../../../static/NoTournament';
import Back from '../../../static/Back';
import MenuButton from './MenuButton';

export default function Menu(props) {
  const context = useContext(TournamentContext);
  const { tournament } = context;
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
