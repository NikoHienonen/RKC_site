export default function ValidateValues(values) {
  let errors= {};
  // Name Errors
  if(!values.name) {
    errors.name = 'Nimi on pakollinen';
  } else if (values.name.length < 3) {
    errors.name = 'Nimen pituus on vähintään kolme merkkiä';
  }
  if(!values.password) {
    errors.password = 'Salasana on pakollinen';
  } else if (values.password.length < 3) {
    errors.password = 'Salasanan pituus on vähintään kolme merkkiä';
  }
  return errors;
}