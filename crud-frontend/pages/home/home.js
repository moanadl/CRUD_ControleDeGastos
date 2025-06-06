// ----- Calls firebase to logout user ----- //
function logout () { 
    firebase.auth().signOut().then(() => {
        window.location.href = '../../index.html';
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
};

// ----- Checks if user is logged ----- //
firebase.auth().onAuthStateChanged(user => {
    if (user) { 
        findTransactions(user);
    };
});

// ----- Sends user to transactions page ----- //
function newTransaction () {
    window.location.href = '../transaction/transaction.html';
}

// ----- Gets and displays transactions ----- //

// Calls firebase to get transactions
function findTransactions (user) {
    showLoading();
    transactionService.findByUser(user)
    .then(transactions => {
        hideLoading();
        addTransactionsToScreen(transactions);
    })
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao recuperar transações')
    });
};

// Calls firebase to add the found transactions to the sreen
function addTransactionsToScreen (transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = createTransactionListItem(transaction);
        li.appendChild(createDeleteButton(transaction));
        li.appendChild(createParagraph(formatDate(transaction.date)));
        li.appendChild(createParagraph(formatMoney(transaction.money)));
        li.appendChild(createParagraph(transaction.type));
        if (transaction.description) {
            li.appendChild(createParagraph(transaction.description));
        };
        orderedList.appendChild(li);
    });
};

// Creates a li element for each found transaction
function createTransactionListItem (transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    li.addEventListener('click', () => {
        window.location.href = '../transaction/transaction.html?uid=' + transaction.uid;
    })
    return li;
};

// Creates a delete button for each transaction
function createDeleteButton (transaction) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Remover';
    deleteButton.classList.add('outline', 'danger');
    deleteButton.addEventListener('click', event => {
        event.stopPropagation();
        askRemoveTransaction(transaction);
    })
    return deleteButton;
}

// Creates a paragraph element
function createParagraph (value) {
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
};

// ----- Removes transaction ----- //

// Asks confirmation to remove transaction
function askRemoveTransaction (transaction) {
    const shouldRemove = confirm('Deseja remover a transação?');
    if (shouldRemove) {
        removeTransaction(transaction);
    };
};

// Calls firebase to remove transaction
function removeTransaction (transaction) {
    showLoading();

    transactionService.remove(transaction)
    .then(() => {
        hideLoading();
        document.getElementById(transaction.uid).remove()
    })
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao remover transação');
    });
};

// ----- Formats date and money ----- //
function formatDate (date) {
    return new Date(date).toLocaleDateString('en-US', {timeZone: "utc"});
};

function formatMoney (money) {
    return  `${money.currency} ${money.value.toFixed(2)}`;
};
