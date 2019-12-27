import React from 'react';

export default function StandingsTable({teams}) {
  const compare = (a, b) => {
    const aRounds = a.roundsWon;
    const bRounds = b.roundsWon; 
    if(aRounds !== bRounds) return aRounds - bRounds;
    const aPoints = a.pointsWon;
    const bPoints = b.pointsWon;
    if(aPoints !== bPoints) return aPoints - bPoints;
  };
  const sortedTeams = [...teams].sort(compare);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              Joukkue
            </th>
            <th>
              Erät
            </th>
            <th>
              V
            </th>
            <th>
              H
            </th>
            <th>
              +/-
            </th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            return <tr key={team._id}>
              <th>{`${index+1}`}</th>
              <td>{team.name}</td>
              <td>{team.roundsPlayed}</td>
              <td>{team.roundsWon}</td>
              <td>{team.roundsLost}</td>
              <td>{team.pointsWon} / {team.pointsLost}</td>
              <th>{team.roundsWon}</th>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
