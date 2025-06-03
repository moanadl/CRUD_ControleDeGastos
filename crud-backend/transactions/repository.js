// Contém a lógica de acesso aos dados do BD ou de APIs de terceiros
import { response } from 'express';
import admin from 'firebase-admin';

export class TransactionRepository {

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
                }))
            })
    };

    findByUid (uid) {
        return admin.firestore()
            .collection('transactions')
            .doc(uid)
            .get()
            .then(snapshot => snapshot.data());
    };

    save (transaction) {
        return admin.firestore()
            .collection('transactions')
            .add(JSON.parse(JSON.stringify(transaction)))
            .then(response => ( { uid: response.id }));
    };

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
        })
    };

    delete (transaction) {
        return admin.firestore()
            .collection('transactions')
            .doc(transaction.uid)
            .delete()

    }

}

// controller -> model -> repository -> model -> controller -> frontend
