import React from 'react';

export default function MatchTable({matches}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              Koti
            </th>
            <th>
            </th>
            <th>
              Vieras
            </th>
            <th>
              Tulos
            </th>
            <th>
              Kenttä
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            const {homeTeam, visitorTeam, homeRoundsWon, 
              visitorRoundsWon, refereeName} = match;
            return <tr key={match._id}>
              <td>{homeTeam}</td>
              <td>-</td>
              <td>{visitorTeam}</td>
              <th>{`${homeRoundsWon} - ${visitorRoundsWon}`}</th>
              <td>{refereeName}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
