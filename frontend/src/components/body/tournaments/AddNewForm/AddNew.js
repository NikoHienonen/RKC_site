import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormHandler from '../../../utilities/FormHandler';
import ValidateValues from '../../../utilities/ValidateValues';

const INITIAL_STATE = {
  name: 'KEINOSEN TURNAUS',
  location: 'Tieteenkatu 4',
  date: new Date(),
  team: '',
  teams: [
    {
      name: "RKC"
    },
    {
      name: "Lempo"
    },
    {
      name: "Aoba"
    },
    {
      name: "Shiratorizawa"
    },
  ]
}

export default function AddNew() {
  const { 
    handleChange, 
    handleTeamsChange, 
    handleDateChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
    dbError
  } = FormHandler(INITIAL_STATE, ValidateValues);

  function handleSelect(date) {
    handleDateChange(date);
  }
  function addTeam(e) {
    e.preventDefault();
    handleTeamsChange();
  }
 
  return(
    <form onSubmit={submit}>
      <label style={{display: 'block'}}>
        Name:
        <input value={values.name} onChange={handleChange} 
        onBlur={handleBlur} className={errors.name && 'error-input'} type="text" name="name"/>
      </label>
      {errors.name && <p className="error-text">{errors.name}</p>}
      <label style={{display: 'block'}}>
        Location:
        <input value={values.location} onChange={handleChange} 
        onBlur={handleBlur} className={errors.location && 'error-input'} type="text" name="location"/>
      </label>
      {errors.location && <p className="error-text">{errors.location}</p>}
      <label style={{display: 'block'}}>
        Date:
        <DatePicker
        selected={values.date}
        onSelect={handleSelect}
        />
      </label>
      {!values.teams 
        ? <p>No teams yet!</p> 
      : <ul>{values.teams.map((team, i) => <li key={i}>{team.name}</li>)}</ul>
      }
      <label>
        Add New Team:
        <input value={values.team} onChange={handleChange} 
        onBlur={handleBlur} type="text" name="team"/>
      </label>
      <button onClick={addTeam}>Add</button>
      {errors.team && <p className="error-text">{errors.team}</p>}
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
      {dbError && <p className="error-text">{dbError }</p>}
    </form>
  )
}