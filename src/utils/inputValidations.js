import axios from "axios";

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) && email.includes("@") && email.includes(".") && !email.includes(" ");
}

export function isValidPhoneNumber(phoneNumber) {
    // Define a regex pattern para validar o número de telefone
    const regex = /^9\d{8}$/;

    // Testa se a string do número de telefone corresponde ao padrão
    return regex.test(phoneNumber) && validateNif(phoneNumber);
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

export function validateNif(nif) {
    return nif.length===9 && !haveLetters(nif);
}


export function validateNic(nif) {
    return nif.length===8 && !haveLetters(nif);
}


export function haveLetters(input) {
    return /[a-z]/i.test(input);
}

export async function checkIfEmailExists(email) {
    const response = await axios.post("http://localhost:3000/api/users/checkByEmail", {email: email});
    const data = response.data;
    return data;
}
