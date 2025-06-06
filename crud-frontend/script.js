// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         window.location.href = 'pages/home/home.html'
//     }
// })

// ----- Logs in or registers user ----- //

// Calls firebase to let user log in
function login () {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        hideLoading();
        window.location.href = 'pages/home/home.html';
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error)); // Colocar uma mensagem mais amigável que o código
    }); 
};

// If user doesn't exists displays error message
function getErrorMessage (error) {
    if (error.code == 'auth/invalid-credential') {
        return 'Usuário e/ou senha inválidos';
    };
    return error.message;
};

// Takes user to register page
function register () {
    window.location.href = 'pages/register/register.html';
};

// Calls firebase to recover user's password
function recoverPassword () {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => { // Função do próprio firebase
        hideLoading();
        console.log(form.email().value);
        alert('Email enviado com sucesso'); // Essa mensagem vai aparecer mesmo se o email não estiver cadastrado
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
};

// ----- Errors management ----- //

// Listens to email input
function onChangeEmail () {
    toggleButtonsDisable(); // Disables buttons
    toggleEmailErrors(); // Shows errors messages
};

// Listens to password input
function onChangePassword () {
    toggleButtonsDisable(); // Disables buttons
    togglePasswordErrors(); // Shows errors messages
};

// Checks if email is valid
function isEmailValid () {
    const email = form.email().value;
    
    if (!email) { // Se o input de email estiver vazio, retorna false
        return false;
    };
    return validateEmail(email); // Se email for válido, retorna true. Caso contrário, retorna false
};

// If email is invalid displays error messages
function toggleEmailErrors () {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
};

// Checks if password is valid
function isPasswordValid () {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
};

// If password is invalid displays error messages
function togglePasswordErrors () {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
};

// If email and/or password are invalid disables login button
function toggleButtonsDisable () {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid; // If emailValid is true, disabled will be false and vice-versa
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
};

// ----- Variables collection ----- //
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () =>  document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
};
