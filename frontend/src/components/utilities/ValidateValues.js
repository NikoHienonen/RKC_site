export default function ValidateValues(values) {
  let errors= {};
  // Name Errors
  if(!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Name is too short (min-length is 3)';
  }
  // Location Errors
  if(!values.location) {
    errors.location = 'Location is required';
  } else if (values.location.length < 3) {
    errors.location = 'Location is too short (min-length is 3)';
  }
  return errors;
}