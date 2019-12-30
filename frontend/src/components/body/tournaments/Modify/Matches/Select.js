import React from 'react';

export default function Select({array, value, onChange, name}) {

  return (
    <select value={value} onChange={onChange} name={name} >
      {array.map(element => {
        return <option value={element.name} key={element._id}>{element.name}</option>
      })}
    </select>
  );
}
