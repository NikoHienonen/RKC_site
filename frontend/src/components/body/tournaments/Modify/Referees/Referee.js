import React from 'react';
import { deleteReferee } from '../../../../utilities/FetchClient';

export default function Referee({referee, id}) {
  return (
    <div className="referee card">
      <div>
        <p>Nimi: {referee.name}</p>
        <p>Salasana: {referee.password}</p>
      </div>
      <button onClick={() => deleteReferee(referee, id, result => {
        alert(result);
      })}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
}
