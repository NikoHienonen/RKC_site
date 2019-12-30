export default function ValidateValues(values) {
  let errors= {};
  // Name Errors
  if(!values.name) {
    errors.name = 'Nimi on pakollinen';
  } else if (values.name.length < 3) {
    errors.name = 'Nimen pituus on vähintään kolme merkkiä';
  }
  // Location Errors
  if(!values.location) {
    errors.location = 'Sijainti on pakollinen';
  } else if (values.location.length < 3) {
    errors.location = 'Sijainnin pituus on vähintään kolme merkkiä';
  }
  if(!values.maxRounds) {
    errors.maxRounds = 'Eräkatto on pakollinen';
  } else if (values.maxRounds === 0 || values.maxRounds < 0) {
    errors.maxRounds = 'Eräkaton on oltava enemmän kuin nolla';
  }
  if(!values.maxPoints) {
    errors.maxPoints = 'Pistekatto on pakollinen';
  } else if (values.maxPoints === 0 || values.maxPoints < 0) {
    errors.maxPoints = 'Pistekaton on oltava enemmän kuin nolla';
  }
  if(!values.timeOuts) {
    errors.timeOuts = 'Timeout on pakollinen';
  }
  return errors;
}