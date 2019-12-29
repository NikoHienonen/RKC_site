import React from 'react';
import { deleteTeam } from '../../../../utilities/FetchClient';

export default function Team({key1, team, id, toggleRefresh}) {
  return (
    <li key={key1}>
      <h2>{team.name}</h2>
      <button className="delete" onClick={() => deleteTeam(team.name, id, result => {
        alert(result.err ? result.err : 'Poisto onnistui');
        toggleRefresh();
        })}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </li>
  );
}
