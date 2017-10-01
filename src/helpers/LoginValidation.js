function validateUsername(username) {
    var validCharsRegex = /^[\w\.]+$/;
    var length = username.length;
    var validChars = validCharsRegex.test(username);
    return (length >= 3) && (length <= 20) && validChars;
}

function validatePassword(password) {
    var length = password.length;
    return (length >=6) && (length <= 30);
}

export function loginValidator(username, password) {
    return validateUsername(username) && validatePassword(password);
}
