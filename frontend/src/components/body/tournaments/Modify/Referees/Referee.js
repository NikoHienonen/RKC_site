import React from 'react';
import { deleteReferee } from '../../../../utilities/FetchClient';

export default function Referee({referee, id, toggleRefresh}) {
  return (
    <div className="referee card">
      <p>Nimi: {referee.name}</p>
      <button onClick={() => deleteReferee(referee, id, result => {
        alert(result.err ? 'Poisto epäonnistui' : 'Poisto onnistui');
        toggleRefresh();
      })}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}
