import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { default as FormHandler } from './AddNewFormHandler';
import { default as ValidateValues } from './AddNewValidateValues';
import Back from '../../../static/Back';

const INITIAL_STATE = {
  name: '',
  location: '',
  date: new Date(),
  maxRounds: 0,
  maxPoints: 0,
  timeOuts: 0,
  bestOfMaxRounds: false,
  winByTwo: false,
}

export default function AddNew(props) {
  const { 
    handleChange, 
    handleTeamsChange, 
    handleDateChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
  } = FormHandler(INITIAL_STATE, ValidateValues, props);

  function handleSelect(date) {
    handleDateChange(date);
  }
  return(
    <div>
      <h1>Lisää uusi turnaus</h1>
      <form onSubmit={submit}>
      <label>
        Nimi
        <input value={values.name} onChange={handleChange} 
        onBlur={handleBlur} className={errors.name && 'error-input'} type="text" 
        name="name"/>
      </label>
      {errors.name && <p className="error-text">{errors.name}</p>}
      <label>
        Sijainti
        <input value={values.location} onChange={handleChange} 
        onBlur={handleBlur} className={errors.location && 'error-input'} type="text" 
        name="location"/>
      </label>
      {errors.location && <p className="error-text">{errors.location}</p>}
      <label>
        Ajankohta
        <DatePicker
        selected={values.date}
        onSelect={handleSelect}
        showTimeSelect
        dateFormat="Pp"
        />
      </label>
      <label >
        Eräkatto
        <input value={values.maxRounds} onChange={handleChange} 
        onBlur={handleBlur} className={errors.maxRounds && 'error-input'} type="number" 
        name="maxRounds"/>
      </label>
      {errors.maxRounds && <p className="error-text">{errors.maxRounds}</p>}
      <label>
        Pistekatto
        <input value={values.maxPoints} onChange={handleChange} 
        onBlur={handleBlur} className={errors.maxPoints && 'error-input'} type="number" 
        name="maxPoints"/>
      </label>
      {errors.maxPoints && <p className="error-text">{errors.maxPoints}</p>}
      <label>
        Aikalisät per erä
        <input value={values.timeOuts} onChange={handleChange} 
        onBlur={handleBlur} className={errors.timeOuts && 'error-input'} type="number" 
        name="timeOuts"/>
      </label>
      {errors.timeOuts && <p className="error-text">{errors.timeOuts}</p>}
      <label>
        Paras eräkatosta
        <input value={values.bestOfMaxRounds} onChange={handleChange} 
        onBlur={handleBlur} className="checkbox" type="checkbox" 
        name="bestOfMaxRounds"/>
      </label>
      <label>
        Kahden erolla
        <input value={values.winByTwo} onChange={handleChange} 
        onBlur={handleBlur} className="checkbox" type="checkbox" 
        name="winByTwo"/>
      </label>
      <button disabled={isSubmitting} type="submit">
        Luo
      </button>
    </form>
    <Back className="m3-container" link={'/turnaukset'}/>
    </div>
  )
}