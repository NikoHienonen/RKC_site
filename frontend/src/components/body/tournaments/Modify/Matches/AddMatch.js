import React from 'react';

import MatchValidateValues from './MatchValidateValues';
import MatchFormHandler from './MatchFormHandler';

import Select from './Select';

export default function AddMatch({tournament, navigate, toggleRefresh}) {
  const INITIAL_VALUES = {
    home: tournament.teams[0].name,
    visitor: tournament.teams[0].name,
    refereeName: tournament.referees[0].name
  }
  const { 
    handleChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
  } = MatchFormHandler(tournament.defaultMatch, INITIAL_VALUES, MatchValidateValues, 
    tournament._id, toggleRefresh);

  return (
    <div className="m3-container">
      <h2>Lisää ottelu:</h2>
      <form onSubmit={submit}>
        <label style={{display: 'block'}}>
          Koti:
          <Select className={errors.home && 'error-input'} array={tournament.teams} 
           value={values.home} onChange={handleChange} name="home" />
        </label>
        {errors.home && <p className="error-text">{errors.home}</p>}
        <label style={{display: 'block'}}>
          Vieras:
          <Select className={errors.visitor && 'error-input'} array={tournament.teams} 
           value={values.visitor} onChange={handleChange} name="visitor" />
        </label>
        {errors.visitor && <p className="error-text">{errors.visitor}</p>}
        <label style={{display: 'block'}}>
          Tuomari:
          <Select className={errors.referee && 'error-input'} array={tournament.referees} 
           value={values.refereeName} onChange={handleChange} name="refereeName" />
        </label>
        {errors.refereeName && <p className="error-text">{errors.refereeName}</p>}
        <button disabled={isSubmitting} type="submit">
          Tallenna
        </button>
      </form>
    </div>
  );
}