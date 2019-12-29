import React from 'react';
import TeamValidateValues from './TeamValidateValues';
import TeamFormHandler from './TeamFormHandler';

export default function AddTeam({INITIAL_VALUES, _id, toggleRefresh}) {
  const { 
    handleChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
  } = TeamFormHandler(INITIAL_VALUES, TeamValidateValues, _id, toggleRefresh);

  return (
    <div className="m3-container">
      <h2>Lisää joukkue:</h2>
      <form onSubmit={submit}>
        <label style={{display: 'block'}}>
          Nimi:
          <input value={values.name} onChange={handleChange} 
            onBlur={handleBlur} className={errors.name && 'error-input'} 
            type="text" name="name"
          />
        </label>
        {errors.name && <p className="error-text">{errors.name}</p>}
        <button disabled={isSubmitting} type="submit">
          Lisää
        </button>
      </form>
    </div>
  );
}
