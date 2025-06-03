// ----- Gerenciamento de erros no formulário ----- //

function onChangeDate () {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? 'block' : 'none';

    toggleSaveButtonDisable();
}

function onChangeValue () {
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? 'block' : 'none';
    form.valueLessOrEqualToZeroError().style.display = value < 0 ? 'block' : 'none';

    toggleSaveButtonDisable();
}

function onChangeTransactionType () {
    const transactionType = form.transactionType().value;
    form.transactionTypeRequiredError().style.display = !transactionType ? 'block' : 'none';

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable () {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid () {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const value = form.value().value;
    if (!value) {
        return false;
    }

    const transactionType = form.transactionType().value;
    if (!transactionType) {
        return false;
    }

    return true;
}

// ----- Edições nas transações ----- //

// ----- Pega os valores do formulário e cria ou edita uma transação ----- //
function saveTransaction () {
    showLoading();
    const transaction = createTransaction();

    if (isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction);
    }
}

function save (transaction) {
    transactionService.save(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html'
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao salvar transação')
    })
}

function update (transaction) {
    showLoading();
    transactionService.update(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html';
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao atualizar transação')
    })
}

// ----- Pega os valores do formulário e os retorna em um objeto ----- //
function createTransaction () {
    return {
         type: form.typeExpense().checked ? 'expense' : 'income',
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

// ----- Verificar se transação é nova. Se não for, encontre ela. ----- //
if (!isNewTransaction()) { // Quandoa página carrega verifica se a transação é nova ou não
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}

// ----- O parâmetro de uid existe ou retorna vazio? ----- //
function isNewTransaction () {
    return getTransactionUid() ? false : true;
}

// ----- Verifica se o parâmetro de uid existe ----- //
function getTransactionUid () {
    const urlParams = new URLSearchParams(window.location.search); // Vai pegar a query string da URL e dizer quantos parâmetros tem e permitir manipular cada um deles
    return urlParams.get('uid');
}

// ----- Encontra a transação, pega os valores dos parâmetros dela e preenche o formulário ----- //
function findTransactionByUid (uid) {
    showLoading();

    transactionService.findByUid(uid)
    .then(transaction => {
        hideLoading();
        if (transaction) {
            fillTransactionScreen(transaction);
            toggleSaveButtonDisable();
        } else {
            alert('Documento não encontrado');
            window.location.href = '../home/home.html';
        }
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao recuperar documento');
        window.location.href = '../home/home.html';
    })
}

// ----- Preenche o formulário com os valores dos parâmetros da transação sendo editada ----- //
function fillTransactionScreen (transaction) {
    if (transaction.type == 'expense') {
        form.typeExpense().checked = true;
    } else {
        form.typeIncome().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;

    if (transaction.description) {
        form.description().value = transaction.description;
    }
}

const form = {
    currency: () => document.getElementById('currency'),
    date: () => document.getElementById('date'),
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    saveButton: () => document.getElementById('save-button'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error')
}
