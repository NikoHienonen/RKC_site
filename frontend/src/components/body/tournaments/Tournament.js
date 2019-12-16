import React, { useState, useEffect } from 'react';

import {getTournamentById} from '../../../components/utilities/FetchClient';

export default function Tournament(props) {
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    if(!tournament) {
      const { id } = props.location.state;
      console.log(id)
      getTournamentById(id, tournament => {
        if(tournament){
          console.log(tournament)
          setTournament(tournament);
        }
      })
    }
  });

  return (
    !tournament
    ? <p>No tournament found!</p>
    : 
    (
      <div className="tournament">
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
    )
  );
}
