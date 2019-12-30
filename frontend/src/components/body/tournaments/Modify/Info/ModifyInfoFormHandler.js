import { useState, useEffect } from 'react'

import { updateTournament } from '../../../../utilities/FetchClient';

export default function FormHandler(initialState, validate, id, navigate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        const data = {
          name: values.name, 
          date: values.date, 
          location: values.location,
          defaultMatch: {
            maxRounds: Number(values.maxRounds),
            maxPoints: Number(values.maxPoints),
            timeOuts: Number(values.timeOuts),
            bestOfMaxRounds: values.bestOfMaxRounds,
            winByTwo: values.winByTwo
          }
        };
        sendTournament(data);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);
  
  function sendTournament(data) {
    updateTournament(id, data, result => {
      alert(result.data ? result.data.message : 'Päivitys  epäonnistui');
      navigate();
    });
  }

  function handleDateChange(date) {
    setValues({
      ...values,
      date: date
    });
  }

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value
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

  return { handleChange, handleDateChange, handleBlur, submit, 
    errors, values, isSubmitting };
}
