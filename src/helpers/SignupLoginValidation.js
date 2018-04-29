function validateUsername(username) {
  const validCharsRegex = /^[\w\.]+$/;
  const length = username.length;
  let isValid = true;
  let errors = [];

  if (length < 3 || length > 20) {
    isValid = false;
    errors.push("Username must be 3-20 characters long");
  }
  if (!(validCharsRegex.test(username))) {
    isValid = false;
    errors.push("Username can only contain letters (a-z), numbers, underscores, and periods");
  }

  return {
    "validUsername": isValid,
    "usernameErrors": errors
  }
}

function validatePassword(password, passConfirm) {
  const length = password.length;
  let isValid = true;
  let errors = [];

  if (length < 6 || length > 30) {
    isValid = false;
    errors.push("Password must be between 6-20 characters long");
  }
  if (password !== passConfirm && isValid) {
    isValid = false;
    errors.push("Passwords must match");
  }

  return {
    "validPassword": isValid,
    "passwordErrors": errors
  }
}

export function signupValidator(username, password, passConfirm) {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password, passConfirm);
  let validSignup = true;
  let errors = [];

  if (!usernameValidation.validUsername) {
    validSignup = false;
    errors = errors.concat(usernameValidation.usernameErrors);
  }
  if (!passwordValidation.validPassword) {
    validSignup = false;
    errors = errors.concat(passwordValidation.passwordErrors);
  }

  return {
    validSignup: validSignup,
    errors: errors
  }
}

function validateUsername(username) {
  let errors = [];
  let isValid = true;

  const validCharsRegex = /^[\w\.]+$/;
  const length = username.length;
  const validChars = validCharsRegex.test(username);

  if (!validChars) {
    errors.push("Username can only contain letters, numbers, and underscores.");
    isValid = false;
  }

  if (length < 3 || length > 20) {
    errors.push("Username must be between 3 and 20 characters long.");
    isValid = false;
  }

  return {
    "validUsername": isValid,
    "usernameErrors": errors
  }
}

function validatePassword(password) {
  let errors = [];
  let isValid = true;
  const length = password.length;

  if (length < 6 || length > 30) {
    errors.push("Password must be between 6 and 30 characters long.");
    isValid = false;
  }

  return {
    "validPassword": isValid,
    "passwordErrors": errors
  }
}

export function loginValidator(username, password) {
  let errors = [];
  let validLogin = true;

  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);

  if (!usernameValidation.validUsername) {
    validLogin = false;
    errors = errors.concat(usernameValidation.usernameErrors);
  }
  if (!passwordValidation.validPassword) {
    validLogin = false;
    errors = errors.concat(passwordValidation.passwordErrors);
  }

  return {
    validLogin: validLogin,
    errors: errors
  }
}