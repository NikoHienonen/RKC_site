import React from 'react';

export default function MatchesTable({id, matches, deleteMatchById, toggleRefresh}) {
  const compare = (a, b) => {
    return a.startingTime.localeCompare(b.startingTime);
  }
  const sorted = [...matches].sort(compare);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
          <th>
              Aika
            </th>
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
            <th>
              Poista
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((match) => {
            const {homeTeam, visitorTeam, homeRoundsWon, 
              visitorRoundsWon, startingTime, refereeName} = match;
            return <tr key={match._id}>
              <td>{startingTime}</td>
              <td>{homeTeam}</td>
              <td>-</td>
              <td>{visitorTeam}</td>
              <th>{`${homeRoundsWon} - ${visitorRoundsWon}`}</th>
              <td>{refereeName}</td>
              <td>
              <button onClick={() => deleteMatchById(match._id, id, result => {
                alert(result.err ? 'Poisto epäonnistui' : 'Poisto onnistui');
                toggleRefresh();
              })}>
                <i className="fas fa-trash-alt"></i>
              </button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
