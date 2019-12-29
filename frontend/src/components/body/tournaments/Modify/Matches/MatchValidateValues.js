export default function MatchValidateValues(values) {
  let errors= {};
  // home Errors
  if(!values.home) {
    errors.home = 'Kotijoukkue on pakollinen';
  }
  if(!values.visitor) {
    errors.visitor = 'Vierasjoukkue on pakollinen';
  }
  if(!values.refereeName) {
    errors.refereeName = 'Tuomari on pakollinen';
  }
  return errors;
}