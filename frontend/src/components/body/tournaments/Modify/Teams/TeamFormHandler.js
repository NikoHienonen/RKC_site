import { useState, useEffect } from 'react'

import { addTeam } from '../../../../utilities/FetchClient';

export default function FormHandler(initialState, validate, id) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        postTeam(values.name);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);
  
  function postTeam(data) {
    addTeam(data, id, result => {
      alert(result.err ? result.err : 'Lisäys onnistui');
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
