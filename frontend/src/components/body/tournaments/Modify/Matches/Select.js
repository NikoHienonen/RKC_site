import React from 'react';

export default function Select({array, value, onChange, name}) {

  return (
    <select value={value} onChange={onChange} name={name} >
      {array.map(element => {
        return <option value={element.name}>{element.name}</option>
      })}
    </select>
  );
}
