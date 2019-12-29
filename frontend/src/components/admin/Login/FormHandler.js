import { useState, useEffect, useContext } from 'react'
import { login } from '../../utilities/FetchClient';
import { useAuthDataContext } from '../../utilities/AuthDataProvider';

export default function FormHandler(initialState, validate, navigate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  console.log(useAuthDataContext)
  const { onLogin } = useAuthDataContext();

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      console.log(noErrors)
      if(noErrors) {
        attemptLogin();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function attemptLogin() {
    const admin = {
      username: values.username,
      password: values.password
    }
    login(admin, result => {
      console.log(result)
      if(result.status === 200) {
        onLogin(values.username);
        navigate();
      }
      else if(result.status === 500) {
        alert('Network error');
      } else if(result.status === 404) {
        alert('Väärä käyttäjä');
      } else if(result.status === 401) {
        alert('Väärä salasana');
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
  }

  function submit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return { handleChange, handleBlur, submit, errors, values, isSubmitting };
}
