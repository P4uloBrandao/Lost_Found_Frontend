export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePasswordCorrespondence(password, confirmPassword) {
    if (confirmPassword === "") return false;
  return password === confirmPassword;
}

export function validateBirthDate(birthDate) {
    if(!!birthDate) {
        return false;
    }
    const today = new Date();
    const birth = new Date(birthDate);
    console.log(birth, today)
    return birth <= today;
}