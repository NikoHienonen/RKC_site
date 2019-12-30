import { useState, useEffect } from 'react'
import { login } from '../../utilities/FetchClient';
import { useAuthDataContext } from '../../utilities/AuthDataProvider';

export default function FormHandler(initialState, validate, navigate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const { onLogin } = useAuthDataContext();

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        attemptLogin();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [isSubmitting, errors, attemptLogin]);

  function attemptLogin() {
    const admin = {
      username: values.username,
      password: values.password
    }
    login(admin, result => {
      if(result.status === 200) {
        onLogin(result.data.token, result.data.id);
        navigate();
      }
      else {
        alert('Väärä käyttäjä tai salasana')
      }
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
