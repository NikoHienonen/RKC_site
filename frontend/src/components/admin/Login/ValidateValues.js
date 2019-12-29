export default function ValidateValues(values) {
  let errors= {};
  // Username Errors
  if(!values.username) {
    errors.username = 'Käyttäjä on pakollinen';
  } else if (values.username.length < 4) {
    errors.username = 'Käyttäjän pituus on oltava vähintään 4 merkkiä';
  }
  // Password Errors
  if(!values.password) {
    errors.password = 'Salasana on pakollinen';
  } else if (values.password.length < 6) {
    errors.password = 'Salasanan pituus on oltava vähintään 6 merkkiä';
  }
  return errors;
}