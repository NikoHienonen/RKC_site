import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../../../utilities/TournamentContext';
import ReturnToTournaments from '../../../static/ReturnToTournaments';
import Back from '../../../static/Back';

export default function Menu(props) {
  return (
    <TournamentContext.Consumer>
      {context => {
        const { tournament, setTournament } = context;
        let url;
        if(tournament) { url = `/turnaukset/${tournament.name}/muokkaa/`}
        return !tournament
        ? (
          <div>
            <p>Turnausta ei löytynyt</p>            
            <ReturnToTournaments/>
          </div>
        )
        : (
          <div className="modify-menu">
            <h1>Muokkaa turnausta: {tournament.name}</h1>
            <div className="menu-buttons">
              <button className="menu-button">
              <Link to={url+'yleinen'}>Yleinen</Link>
              </button>
              <button className="menu-button">
              <Link to={url+'joukkueet'}>Joukkueet</Link>
              </button>
              <button className="menu-button">
              <Link to={url+'tuomarit'}>Tuomarit</Link>
              </button>
              <button className="menu-button">
              <Link to={url+'ottelut'}>Ottelut</Link>
              </button>
            </div>
            <Back link={`/turnaukset/${tournament.name}`}/>
          </div>
        )
      }}
    </TournamentContext.Consumer>
  );
}
