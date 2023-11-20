import validator from "validator";

export const checkValidEmail = (email) => {
  const isValidEmail = validator.isEmail(email);
  return isValidEmail;
};
