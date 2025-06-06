// ----- Services to access backend with firestore ----- //
const transactionService = {
    // Gets transactions with user uid
    findByUser: () => {
        return callApi({
            method: 'GET',
            url: 'http://localhost:3000/transactions'
        });
    },
    // Gets transaction with transaction uid
    findByUid: uid => {
        return callApi({
            method: 'GET',
            url: `http://localhost:3000/transactions/${uid}`
        });
    },
    // Removes transaction
    remove: transaction => {
        return callApi({
            method: 'DELETE',
            url: `http://localhost:3000/transactions/${transaction.uid}`
        });
    },
    // Saves transaction
    save: transaction => {
        return firebase.firestore()
            .collection('transactions')
            .add(transaction); // creates a new random uid
    },
    // Updates transaction
    update: transaction => {
        return firebase.firestore()
            .collection('transactions')
            .doc(getTransactionUid())
            .update(transaction);
    }
};

// ----- Calls backend ----- //
function callApi ({ method, url }) {
    return new Promise(async (resolve, reject) => {
        // Allows calling the backend using AJAX
        const xhr = new XMLHttpRequest();
        // Opens a call to the backend
        xhr.open(
            method,
            url,
            true // To be async
        );

        // Authorizes call with JWT token
        xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken());
        // Informs that the content is json and will use UTF-8
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        // When ready state of the call changes resolve promise
        xhr.onreadystatechange = function () { 
            if (this.readyState == 4) {
                const json = JSON.parse(this.responseText);
                if (this.status != 200) {
                    reject(json);
                } else {
                    resolve(json);
                };
            }; 
        };

        // Calls backend
        xhr.send();
    });
};
