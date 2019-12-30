import { useState, useEffect } from 'react'

import { addTeam } from '../../../../utilities/FetchClient';

export default function FormHandler(initialState, validate, id, toggleRefresh) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        const data = {
          name: values.name
        }
        postTeam(data);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  });
  
  function postTeam(data) {
    addTeam(data, id, result => {
      toggleRefresh();
    });
  }

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }
  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function submit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return { handleChange, handleBlur, submit, errors, values, isSubmitting };
}
