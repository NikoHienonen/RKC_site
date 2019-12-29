import React from 'react';
import { Link } from 'react-router-dom';

import { TournamentContext } from '../../utilities/TournamentContext'; 
import DateConvert from '../../utilities/DateConvert';
import Back from '../../static/Back';
import { deleteTournament } from '../../utilities/FetchClient';
import NoTournamentFound from '../../static/NoTournament';

export default function Tournament(props) {
  
  return (
    <TournamentContext.Consumer>
      {context => {
        const { tournament } = context;
        return !tournament
        ? <NoTournamentFound/>
        : <div className="card tournament">
          <h1>{tournament.name}</h1>
          <div>
            <p>{tournament.location}</p>
            <p>{DateConvert(tournament.date)}</p>
            <div className="actions">
              <Link to={`/turnaukset/${tournament.name}/sarjataulukko`}>Sarjataulukko</Link>
              <Link to={`/turnaukset/${tournament.name}/otteluohjelma`}>Otteluohjelma</Link>
              <Link to={`/turnaukset/${tournament.name}/muokkaa`}>Muokkaa</Link>
              <button className="delete" 
                onClick={() => deleteTournament(tournament._id, result => {
                  console.log(result);
                  alert(result.message ? "Poisto epäonnistui" : "Poisto Onnistui");
                  props.history.push('/turnaukset');
                  window.location.reload();
                })}
              >
                Poista
              </button>
            </div>
            <Back link='/turnaukset'/>
          </div>
        </div>
      }}
    </TournamentContext.Consumer>
  );
}
