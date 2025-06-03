firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = '../home/home.html'
    }
})

function onChangeEmail () {
    // Mudar tudo isso para ao invés de onchange, fazer onsubmit ou algo assim
    toggleRegisterButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword () {
    toggleRegisterButtonsDisable();
    togglePasswordErrors();
    validatePasswordMatch();
}

function onChangeConfirmPassword () {
    toggleRegisterButtonsDisable();
    validatePasswordMatch()
}

function toggleEmailErrors () {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block'; // Uma forma diferente de escrever o operador ternário
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block'; // Ajeitar para se estiver vazio, deixar só o 'Email é obrigatório'
}

function isEmailValid () {
    const email = form.email().value;
    
    if (!email) { // Se o input de email estiver vazio, retorna false
        return false
    }
    return validateEmail(email); // Se email for válido, retorna true. Caso contrário, retorna false
}

function togglePasswordErrors () {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block'
}

function validatePasswordMatch () {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoestnMatchError().style.display = password == confirmPassword ? 'none' : 'block';
}

function toggleRegisterButtonsDisable () {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid () {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

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
    })
}

function getErrorMessage (error) {
    if (error.code == 'auth/email-already-in-use') {
        return 'Email já cadastrado'; // No caso esse erro se refere tanto a senha tanto ao usuário
    }
    return error.message;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoestnMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () =>  document.getElementById('register-button'),
}
