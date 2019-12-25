import React, {useState} from 'react';

export default function AddTeam({ add, toggleAdd }) {
  const [input, changeInput] = useState("Lisää joukkue...");
  return (
    !add
    ? <button onClick={toggleAdd}>
        <i className="fas fa-plus-square"></i>
      </button>
    : <div>
      <label style={{display: 'block'}}>
        <input value={input} onChange={text => changeInput(text)}  
        type="text" name="input"/>
      </label>
      <button onClick={console.log(input)}>
        Lisää
      </button>
    </div>
  );
}
