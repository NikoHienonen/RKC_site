import React from 'react';

import ChangePassFormHandler from './ChangePassFormHandler';
import ChangePassValidateValues from './ChangePassValidateValues';

const INITIAL_STATE = {
  password: '',
  newPassword: '',
  newPasswordAgain: ''
}

export default function ChangePassForm(props) {
  const navigate = () => {
    props.history.push('/');
    window.location.reload();
  }
  
  const adminId = sessionStorage.getItem('adminId');
  const {
    handleChange, handleBlur, submit, errors, values, isSubmitting
  } = ChangePassFormHandler(INITIAL_STATE, ChangePassValidateValues, navigate, adminId);
  
  return (
    <form className='change-pass' onSubmit={submit}>
      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Vanha salasana'
        type="password"
      />
      <p className='errorMsg'>{errors.password}</p>
      <input 
        name="newPassword"
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Uusi salasana'
        type="password"
      />
      <p className='errorMsg'>{errors.newPassword}</p>
      <input 
        name="newPasswordAgain"
        value={values.newPasswordAgain}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Vahvista uusi salasana'
        type="password"
      />
      <p className='errorMsg'>{errors.newPasswordAgain}</p>
      <button className="submit" disabled={isSubmitting}>
        VAIHDA SALASANA
      </button>
    </form>
  );
}