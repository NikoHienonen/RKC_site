import React from 'react';

import FormHandler from './FormHandler';
import ValidateValues from './ValidateValues';

const INITIAL_STATE = {
  username: '',
  password: ''
}

export default function LoginForm() {
  const {
    handleChange, handleBlur, submit, errors, values, isSubmitting
  } = FormHandler(INITIAL_STATE, ValidateValues);

  return (
    <form className='admin-login' onSubmit={submit}>
      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Username'
      />
      <p className='errorMsg'>{errors.username}</p>
      <input 
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Password'
        type="password"
      />
      <p className='errorMsg'>{errors.password}</p>
      <button className="submit" disabled={isSubmitting}>
        LOGIN
      </button>
    </form>
  );
}