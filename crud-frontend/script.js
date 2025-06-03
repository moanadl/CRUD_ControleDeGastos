firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = 'pages/home/home.html'
    }
})

function onChangeEmail () {
    // Mudar tudo isso para ao invés de onchange, fazer onsubmit ou algo assim
    toggleButtonsDisable();
    toggleEmailErrors();
    
}

function onChangePassword () {
    toggleButtonsDisable();
    togglePasswordErrors();
}

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
}

function getErrorMessage (error) {
    if (error.code == 'auth/invalid-credential') {
        return 'Usuário e/ou senha inválidos'; // No caso esse erro se refere tanto a senha tanto ao usuário
    }
    return error.message;
}

function register () {
    window.location.href = 'pages/register/register.html';
}

function recoverPassword () {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => { // Função do próprio firebase
        hideLoading();
        console.log(form.email().value);
        alert('Email enviado com sucesso'); // Essa mensagem vai aparecer mesmo se o email não estiver cadastrado
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function isEmailValid () {
    const email = form.email().value;
    
    if (!email) { // Se o input de email estiver vazio, retorna false
        return false
    }
    return validateEmail(email); // Se email for válido, retorna true. Caso contrário, retorna false
}

function toggleEmailErrors () {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block'; // Uma forma diferente de escrever o operador ternário
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block'; // Ajeitar para se estiver vazio, deixar só o 'Email é obrigatório'
}

function togglePasswordErrors () {

    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';

}

function toggleButtonsDisable () {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid; // Se emailValid for true, disabled vai ser false e vice-versa

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid () {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () =>  document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}
