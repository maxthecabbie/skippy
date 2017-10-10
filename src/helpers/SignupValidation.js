function validateUsername(username) {
    var validCharsRegex = /^[\w\.]+$/;
    var length = username.length;
    var isValid = true;
    var errors = [];

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
    var length = password.length;
    var isValid = true;
    var errors = [];

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
    var usernameValidation = validateUsername(username);
    var passwordValidation = validatePassword(password, passConfirm);
    var validSignup = true;
    var errors = [];
    
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
