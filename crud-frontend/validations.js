// ----- Checks if email format is valid using regex ----- //
function validateEmail (email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
};
