import React from 'react';

export default function MatchesTable({id, matches, deleteMatchById, toggleRefresh}) {
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
            <th>
              Poista
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            const {homeTeam, visitorTeam, homeRoundsWon, 
              visitorRoundsWon, refereeName} = match;
            console.log(match)
            return <tr key={match._id}>
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