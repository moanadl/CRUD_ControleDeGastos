import admin from 'firebase-admin';

// ----- Calls firebase to access DB ----- //
export class TransactionRepository {

    // Calls firebase to acess user's transactions
    findByUserUid (uid) {
        return admin.firestore()
            .collection('transactions')
            .where('user.uid', '==', uid) 
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    };

    // Calls firebase to acess specific transaction
    findByUid (uid) {
        return admin.firestore()
            .collection('transactions')
            .doc(uid)
            .get()
            .then(snapshot => snapshot.data());
    };

    // Calls firebase to create new transaction
    save (transaction) {
        return admin.firestore()
            .collection('transactions')
            .add(JSON.parse(JSON.stringify(transaction)))
            .then(response => ( { uid: response.id }));
    };

    // Calls firebase to update transaction
    update (transaction) {
        return admin.firestore()
        .collection('transactions')
        .doc(transaction.uid)
        .update({
            date: transaction.date,
            description: transaction.description,
            money: transaction.money,
            transactionType: transaction.transactionType,
            type: transaction.type
        });
    };

    // Calls remove transaction
    delete (transaction) {
        return admin.firestore()
            .collection('transactions')
            .doc(transaction.uid)
            .delete()
    };

};

// controller -> model -> repository -> model -> controller -> frontend
