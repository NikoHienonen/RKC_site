import { useState, useEffect } from 'react'

import { postNewTournament } from './FetchClient';

class Team {
  constructor(name){
    this.name = name;
  }
}

export default function FormHandler(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(true);
  const [dbError, setDBError] = useState(null);

  useEffect(() => {
    console.log(isSubmitting)
    if(isSubmitting) {
      console.log('submit')
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        console.log('no errors')
        const data = {
          name: values.name, 
          date: values.date, 
          location: values.location,
          teams: values.teams
        };
        sendTournament(data);
        setSubmitting(false);
      } else {
        console.log('error')
        setSubmitting(false);
      }
    }
  }, [errors]);
  
  function sendTournament(data) {
    console.log(data)
    postNewTournament(data, result => console.log(result));
  }

  function handleDateChange(date) {
    setValues({
      ...values,
      date: date
    });
  }

  function handleTeamsChange() {
    const validationErrors = validate(values);
    if(!validationErrors.team) {
      let teams = values.teams;
      let newTeam = new Team(values.team);
      teams.push(newTeam);
      setValues({
        ...values,
        teams,
        team: ''
      });
    }
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
    setSubmitting(true);
  }

  return { handleChange, handleTeamsChange, handleDateChange, 
    handleBlur, submit, errors, values, isSubmitting };
}
