// Contém a lógica de acesso aos dados do BD ou de APIs de terceiros
import admin from 'firebase-admin';

export class TransactionRepository {
    findByUserId (uid) {
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
    }
}

// controller -> model -> repository -> model -> controller -> frontend
