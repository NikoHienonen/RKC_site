import { useState, useEffect } from 'react'

import { addMatch } from '../../../../utilities/FetchClient';

export default function MatchFormHandler(defaultMatch, initialState, 
  validate, _id, toggleRefresh) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        if(values.home === values.visitor) {
          alert('Joukkue ei voi pelata itseään vastaan')
        } else {
          const data = {
            match: {
              homeTeam: values.home, 
              visitorTeam: values.visitor,
              refereeName: values.refereeName,
              startingTime: values.startingTime,
              defaultMatch: defaultMatch
            }
          };
          sendMatch(data);
          setSubmitting(false);
        }
      } else {
        setSubmitting(false);
      }
    }
  }, [errors], defaultMatch, isSubmitting, sendMatch, values);
  
  function sendMatch(data) {
    addMatch(data, _id, result => {
      alert(result.err ? 'Lisäys epäonnistui' : 'Lisäys onnistui');
      toggleRefresh();
    });
  }

  function handleTimeChange(time) {
    setValues({
      ...values,
      startingTime: time
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
  return { handleChange, handleBlur, handleTimeChange, submit, errors, values, isSubmitting };
}
