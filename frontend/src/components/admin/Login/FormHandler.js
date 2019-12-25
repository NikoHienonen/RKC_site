import { useState, useEffect } from 'react'
import { useAuthDataContext } from '../../utilities/AuthDataProvider';

export default function FormHandler(initialState, validate, navigate) {
  const { onLogin } = useAuthDataContext();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [dbError, setDBError] = useState(null);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      console.log(noErrors)
      if(noErrors) {
        login();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function login() {
    if(values.username === 'vito') {
      if(values.password === 'rkcvolley') {
        onLogin(values.username);
        window.location.reload();
      }
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
  }

  function submit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return { handleChange, handleBlur, submit, errors, values, isSubmitting };
}
