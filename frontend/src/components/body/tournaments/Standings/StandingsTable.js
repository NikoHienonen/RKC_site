import React from 'react';

export default function StandingsTable({teams}) {
  const compare = (a, b) => {
    const aWins = a.gamesWon;
    const bWins = b.gamesWon;
    if(aWins !== bWins) return bWins - aWins;
    const aRounds = a.roundsWon;
    const bRounds = b.roundsWon; 
    if(aRounds !== bRounds) return  bRounds - aRounds;
    const aPoints = a.pointsWon - a.pointsLost;
    const bPoints = b.pointsWon - b.pointsLost;
    console.log(aPoints, bPoints)
    if(aPoints !== bPoints) return bPoints - aPoints;
  };

  const getPoints = (won, lost) => {
    let points = won - lost;
    return points < 0 ? points : `+${points}`;
  }

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
              Ottelut
            </th>
            <th>
              Voitot
            </th>
            <th>
              Tasapelit
            </th>
            <th>
              Tappiot
            </th>
            <th>
              Eräsuhde
            </th>
            <th>
              Pistesuhde
            </th>
            <th>Sarjapisteet</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            return <tr key={team._id}>
              <th>{`${index+1}`}</th>
              <td>{team.name}</td>
              <td>{team.gamesPlayed}</td>
              <td>{team.gamesWon}</td>
              <td>{team.gamesDraw}</td>
              <td>{team.gamesLost}</td>
              <td>{team.roundsWon} / {team.roundsLost}</td>
              <td>{getPoints(team.pointsWon, team.pointsLost)}</td>
              <th>{team.roundsWon}</th>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
