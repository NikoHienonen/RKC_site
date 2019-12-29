import React from 'react';

export default function MatchesList({matches}) {
  return (
    <ul>
      {matches.map(match => {
        return <li key={match._id}>
          <p>{`${match.homeTeam} - ${match.visitorTeam}`}</p>

        </li>
      })}
    </ul>
  );
}
