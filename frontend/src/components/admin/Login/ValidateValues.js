export default function ValidateValues(values) {
  let errors= {};
  // Username Errors
  if(!values.username) {
    errors.username = 'Username is required';
  } else if (values.username.length < 4) {
    errors.username = 'Username is too short (min-length is 4)';
  }
  // Password Errors
  if(!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password is too short (min-length is 6)';
  }
  return errors;
}