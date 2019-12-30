import { useState, useEffect } from 'react'
import { changePassword } from '../../utilities/FetchClient';

export default function ChangePassFormHandler(initialState, validate, navigate, adminId) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        changePass();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function changePass() {
    const data = {
      password: values.password,
      newPassword: values.newPassword
    }
    changePassword(adminId, data, result => {
      console.log(result.status)
      if(result.status === 200) {
        alert('Salasana vaihdettu');
        navigate();
      }
      else {
        alert('Väärä salasana')
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
