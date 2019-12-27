import React from 'react';
import { deleteTeam } from '../../../../utilities/FetchClient';

export default function Team({team, id}) {
  console.log(team)
  return (
    <li key={team._id}>
      <p>Nimi: {team.name}</p>
      <button onClick={() => deleteTeam(team.name, id, result => {
        alert(result.err ? result.err : 'Poisto onnistui');
        })}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </li>
  );
}
