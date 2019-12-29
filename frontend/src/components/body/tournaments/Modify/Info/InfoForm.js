import React, { Fragment } from 'react';

import Back from "../../../../static/Back";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ModifyInfoFormHandler from './ModifyInfoFormHandler';
import ModifyInfoValidateValues from './ModifyInfoValidateValues';

export default function InfoForm({tournament, id, navigate}) {
  const INITIAL_STATE = {
    name: tournament.name,
    location: tournament.location,
    date: new Date(tournament.date),
    maxRounds: tournament.defaultMatch.maxRounds,
    maxPoints: tournament.defaultMatch.maxPoints,
    bestOfMaxRounds: tournament.defaultMatch.bestOfMaxRounds,
    winByTwo: tournament.defaultMatch.winByTwo
  }
  const { 
    handleChange, 
    handleDateChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
    dbError
  } = ModifyInfoFormHandler(INITIAL_STATE, ModifyInfoValidateValues, id, navigate);

  function handleSelect(date) {
    handleDateChange(date);
  }
  const url = `/turnaukset/${tournament.name}/muokkaa/`;
  return (
    <div className="generic-container">
      <div className="modify">
        <h1>
          Muokkaa yleisiä tietoja
        </h1>
        <form onSubmit={submit}>
          <label style={{display: 'block'}}>
            Nimi:
            <input value={values.name} onChange={handleChange} 
            onBlur={handleBlur} className={errors.name && 'error-input'} 
            type="text" name="name" placeholder={tournament.name}/>
          </label>
          {errors.name && <p className="error-text">{errors.name}</p>}
          <label style={{display: 'block'}}>
            Sijainti:
            <input value={values.location} onChange={handleChange} 
            onBlur={handleBlur} className={errors.location && 'error-input'} 
            type="text" name="location" placeholder={tournament.location}/>
          </label>
          {errors.location && <p className="error-text">{errors.location}</p>}
          <label style={{display: 'block'}}>
            Ajankohta:
            <DatePicker
              selected={values.date}
              onSelect={handleSelect}
              showTimeSelect
              dateFormat="Pp"
            />
          </label>
          <label style={{display: 'block'}}>
            Eräkatto:
            <input value={values.maxRounds} onChange={handleChange} 
            onBlur={handleBlur} className={errors.maxRounds && 'error-input'} type="number" 
            name="maxRounds"/>
          </label>
          {errors.maxRounds && <p className="error-text">{errors.maxRounds}</p>}
          <label style={{display: 'block'}}>
            PisteKatto:
            <input value={values.maxPoints} onChange={handleChange} 
            onBlur={handleBlur} className={errors.maxPoints && 'error-input'} type="number" 
            name="maxPoints"/>
          </label>
          {errors.maxPoints && <p className="error-text">{errors.maxPoints}</p>}
          <label style={{display: 'block'}}>
            Paras etäkatosta:
            <input value={values.bestOfMaxRounds} onChange={handleChange} 
            onBlur={handleBlur} className="checkbox" type="checkbox" 
            name="bestOfMaxRounds"/>
          </label>
          <label style={{display: 'block'}}>
            Kahden erolla:
            <input value={values.winByTwo} onChange={handleChange} 
            onBlur={handleBlur} className="checkbox" type="checkbox" 
            name="winByTwo"/>
          </label>
          <button disabled={isSubmitting} type="submit">
            Tallenna
          </button>
          {dbError && <p className="error-text">{dbError }</p>}
        </form>
      </div>
      <Back link={url}/>
    </div>
  );
}
