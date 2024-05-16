export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isValidPhoneNumber(phoneNumber) {
    // Define a regex pattern para validar o número de telefone
    const regex = /^9\d{8}$/;

    // Testa se a string do número de telefone corresponde ao padrão
    return regex.test(phoneNumber);
}

export function validatePasswordCorrespondence(password, confirmPassword) {
    if (confirmPassword === "") return false;
  return password === confirmPassword;
}

export function validateBirthDate(birthDate) {
    if(!birthDate) {
        return false;
    }
    const today = new Date();
    const birth = new Date(birthDate);
    return birth <= today;
}

