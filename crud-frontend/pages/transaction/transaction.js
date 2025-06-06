// ----- Checks if user is logged and if transaction is new if not calls function fill inputs with existent data ----- //
firebase.auth().onAuthStateChanged(user => {
    if (user){
        // Verifica se transação é nova. Se não for, encontre ela.
        if (!isNewTransaction()) {
            const uid = getTransactionUid();
            findTransactionByUid(uid);
        };
    };
});

// Gets uid from URL, if exists
function getTransactionUid () {
    const urlParams = new URLSearchParams(window.location.search); // Vai pegar a query string da URL e dizer quantos parâmetros tem e permitir manipular cada um deles
    return urlParams.get('uid'); // Retorna a uid da transação para 'isNewTransaction()'
};

// Return if uid exists or is new
function isNewTransaction () {
    return getTransactionUid() ? false : true;
};

// ----- Finds transaction and fill form inputs with existent data ----- //

// Finds transaction with returned uid
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
        };
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao recuperar documento');
        window.location.href = '../home/home.html';
    });
};

// ----- Fills form with the data from transaction being edited ----- //
function fillTransactionScreen (transaction) {
    if (transaction.type == 'expense') {
        form.typeExpense().checked = true;
    } else {
        form.typeIncome().checked = true;
    };

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;

    if (transaction.description) {
        form.description().value = transaction.description;
    };
};

// ----- Saves or updates transaction on firestore ----- //

// Checks if transaction is being created or updated to call proper firebase function
function saveTransaction () {
    const transaction = createTransaction();

    if (isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction);
    };
};

// Calls firebase to save new transaction
function save (transaction) {
    showLoading();

    transactionService.save(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html'
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao salvar transação')
    });
};

// Calls firebase to update edited transaction
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
    });
};

// Return object with input values
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
        },
        uid: getTransactionUid()
    };
};

// ----- Errors management ----- //

// Listens to date input
function onChangeDate () {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? 'block' : 'none';
    toggleSaveButtonDisable();
};

// Listens to money value input
function onChangeValue () {
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? 'block' : 'none';
    form.valueLessOrEqualToZeroError().style.display = value < 0 ? 'block' : 'none';
    toggleSaveButtonDisable();
};

// Listens to transaction type input
function onChangeTransactionType () {
    const transactionType = form.transactionType().value;
    form.transactionTypeRequiredError().style.display = !transactionType ? 'block' : 'none';
    toggleSaveButtonDisable();
};

// ----- Toggles register button when form is valid/invalid ----- //

// If form is invalid disables save button
function toggleSaveButtonDisable () {
    form.saveButton().disabled = !isFormValid();
};

// Checks if form is valid
function isFormValid () {
    const date = form.date().value;
    if (!date) {
        return false;
    };

    const value = form.value().value;
    if (!value) {
        return false;
    };

    const transactionType = form.transactionType().value;
    if (!transactionType) {
        return false;
    };

    return true;
};

// ----- Variables collection ----- //
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
};
