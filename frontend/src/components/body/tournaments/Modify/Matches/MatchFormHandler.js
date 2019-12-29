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
  }, [errors]);
  
  function sendMatch(data) {
    console.log(data)
    addMatch(data, _id, result => {
      console.log(result)
      alert(result.err ? 'Lisäys epäonnistui' : 'Lisäys onnistui');
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
