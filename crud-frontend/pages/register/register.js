// ----- Checks if user is logged and if so sends them to home page ----- //
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = '../home/home.html';
    };
});

// ---- Event listeners ----- //

// Listens to 'email' input
function onChangeEmail () {
    toggleRegisterButtonsDisable();
    toggleEmailErrors();
};

// Listens to 'password' input
function onChangePassword () {
    toggleRegisterButtonsDisable();
    togglePasswordErrors();
    validatePasswordMatch();
};

// Listens to c'confirm password' input
function onChangeConfirmPassword () {
    toggleRegisterButtonsDisable();
    validatePasswordMatch();
};

// ----- Toggles errors on screen ----- //

// If 'email' input contains error, displays error messages
function toggleEmailErrors () {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
};

// Checks if email entered is valid
function isEmailValid () {
    const email = form.email().value;
    
    if (!email) { // Se o input de email estiver vazio, retorna false
        return false;
    };
    return validateEmail(email); // Se email for válido, retorna true. Caso contrário, retorna false
};

// If 'password' input contains error, displays error messages
function togglePasswordErrors () {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block'
};

// If 'confirm password' input contains error, displays error messages
function validatePasswordMatch () {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoestnMatchError().style.display = password == confirmPassword ? 'none' : 'block';
}

// ----- Toggles register button when form is valid/invalid ----- //

// If form is invalid disables register button
function toggleRegisterButtonsDisable () {
    form.registerButton().disabled = !isFormValid();
};

// Checks if form is valid
function isFormValid () {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    };

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    };

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
};

// ----- Registers new user ----- //

// Calls firebase to register new user
function register () {
    showLoading();
    
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        hideLoading();
        window.location.href = '../../pages/home/home.html';
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
};

// Checks if email is already registered and if so displays error message
function getErrorMessage (error) {
    if (error.code == 'auth/email-already-in-use') {
        return 'Email já cadastrado';
    }
    return error.message;
}

// ----- Variables collection ----- //
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoestnMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () =>  document.getElementById('register-button')
};
