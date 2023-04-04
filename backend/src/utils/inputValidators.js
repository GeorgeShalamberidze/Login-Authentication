const validateRegisterInputs = (registerInputs) => {
  const { username, password, confirmPassword } = registerInputs;
  const errors = {};

  if (username.trim() === "") errors.usernameErr = "Username is empty";
  if (password.trim() === "") errors.passwordErr = "Password is empty";
  if (confirmPassword.trim() === "")
    errors.confirmPasswordErr = "Confirm Password is empty";
  if (password !== confirmPassword)
    errors.mismatchErr = "Passwords do not match";

  const isValid = Object.keys(errors).length < 1;

  return { errors, isValid };
};

const validateLoginInputs = (loginInputs) => {
  const { username, password } = loginInputs;
  const errors = {};

  if (username.trim() === "") errors.username = "Username is empty";
  if (password.trim() === "") errors.password = "Password is empty";

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};

module.exports = { validateLoginInputs, validateRegisterInputs };
