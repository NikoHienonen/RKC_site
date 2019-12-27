import React, { useState, useEffect } from 'react';
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

/*
!tournament
    ? <p>No tournament found!</p>
    : 
    (
      <div className="tournament">
        <Link to={{pathname: `/turnaukset/${tournament.name}/muokkaa`
        , state: {id: tournament._id, name: tournament.name}}}>Muokkaa</Link>
        <h2>{tournament.name}</h2>
        <p>{tournament.location}</p>
        <p>{tournament.date}</p>
        {
          !tournament.teams
          ? <p>No teams yet!</p>
          : (
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Rounds Played</th>
                <th>Rounds Won</th>
                <th>Rounds Lost</th>
                <th>Points Won</th>
                <th>Points Lost</th>
              </tr>
              </thead>
              <tbody>
              {tournament.teams.map(team => {
                return (
                <tr key={team.name}>
                  <td>{team.name}</td>
                  <td>{team.roundsPlayed}</td>
                  <td>{team.roundsWon}</td>
                  <td>{team.roundsLost}</td>
                  <td>{team.pointsWon}</td>
                  <td>{team.pointsLost}</td>
                </tr>
                )
              })}
              </tbody>
            </table>
          )
        }
      </div>
    ) */