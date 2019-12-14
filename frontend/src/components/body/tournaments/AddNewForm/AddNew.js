import React, {useState} from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { postNewTournament } from '../../../../FetchClient';

export default function AddNew() {
  const [name, setName] = useState('RKC Turnaus');
  const [date, setDate] = useState(new Date());
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState([]);
  
  const submit = e => {
    e.preventDefault();
    const data = {name, date, teams};
    postNewTournament(data, result => console.log(result));
  }

  return(
    <form onSubmit={submit}>
      <label style={{display: 'block'}}>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} type="text" name="name"/>
      </label>
      <label style={{display: 'block'}}>
        Date:
        <DatePicker
        selected={date}
        onChange={newDate => {setDate(newDate)}}
        />
      </label>
      {!teams 
        ? <p>No teams yet!</p> 
      : <ul>{teams.map((team, i) => <li key={i}>{team}</li>)}</ul>
      }
      <label>
        Add New Team:
        <input value={team} onChange={e => setTeam(e.target.value)} 
        type="text" name="team"/>
      </label>
      <button onClick={e => {
        e.preventDefault();
        if(team.length > 2) {
          setTeam('');
          setTeams([...teams, team]);
        }
      }}>Add</button>
      <input type="submit" value="Submit"/>   
    </form>
  )
}