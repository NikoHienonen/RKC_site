export default function ChangePassValidateValues(values) {
  let errors= {};
  // Old Password Errors
  if(!values.password) {
    errors.password = 'Vanha salasana on pakollinen';
  } else if (values.password.length < 4) {
    errors.password = 'Vanhan salasanan pituus on vähintään 6 merkkiä';
  }
  // New Password Errors
  if(!values.newPassword) {
    errors.newPassword = 'Uusi salasana on pakollinen';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Uuden salasanan pituus on vähintään 6 merkkiä';
  }
  // New Password Confirm Errors
  if(!values.newPasswordAgain) {
    errors.newPasswordAgain = 'Vahvista salasana';
  } else if (values.newPasswordAgain.length < 6) {
    errors.newPasswordAgain = 'Salasanan vahvistuksen pituus on vähintään 6 merkkiä';
  }
  else if(values.newPassword !== values.newPasswordAgain) {
    errors.newPasswordAgain = 'Salasanat eivät täsmää'
  }
  return errors;
}