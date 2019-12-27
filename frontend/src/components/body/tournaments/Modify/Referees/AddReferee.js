import React from 'react';
import RefereeValidateValues from './RefereeValidateValues';
import RefereeFormHandler from './RefereeFormHandler';

export default function AddReferee({INITIAL_VALUES, _id}) {
  const { 
    handleChange, 
    handleBlur, 
    submit, 
    errors, 
    values, 
    isSubmitting, 
  } = RefereeFormHandler(INITIAL_VALUES, RefereeValidateValues, _id);

  return (
    <div className="m3-container">
      <h2>Lisää tuomari:</h2>
      <form onSubmit={submit}>
        <label style={{display: 'block'}}>
          Nimi:
          <input value={values.name} onChange={handleChange} 
            onBlur={handleBlur} className={errors.name && 'error-input'} 
            type="text" name="name"
          />
        </label>
        {errors.name && <p className="error-text">{errors.name}</p>}
        <label style={{display: 'block'}}>
          Salasana:
          <input value={values.password} onChange={handleChange} 
            onBlur={handleBlur} className={errors.name && 'error-input'} 
            type="text" name="password"
          />
        </label>
        {errors.password && <p className="error-text">{errors.password}</p>}
        <button disabled={isSubmitting} type="submit">
          Tallenna
        </button>
      </form>
    </div>
  );
}
