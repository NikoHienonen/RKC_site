import { useState, useEffect } from 'react'

import { updateTournament } from '../../../utilities/FetchClient';

class Team {
  constructor(name){
    this.name = name;
  }
}

export default function FormHandler(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [dbResult, setDBResult] = useState(null);

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
    /*postNewTournament(data, result => {
      setDBResult(result.message)
    });*/
    console.log(data);
  }

  function handleDateChange(date) {
    setValues({
      ...values,
      date: date
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

  return { handleChange, handleTeamsChange, handleDateChange, 
    handleBlur, submit, errors, values, isSubmitting };
}
