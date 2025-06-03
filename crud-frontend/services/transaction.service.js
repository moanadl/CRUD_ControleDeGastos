// ----- Esse arquivo vai conter uma camada de serviços para acessar o backend com o firestore----- //

const transactionService = {
    findByUser: () => {
        return callApi({
            method: 'GET',
            url: 'http://localhost:3000/transactions'
        });

    },
    findByUid: uid => {
        return callApi({
            method: 'GET',
            url: `http://localhost:3000/transactions/${uid}`
        });
        // return firebase.firestore()
        //     .collection('transactions') // Coleção 'transactions'
        //     .doc(uid) // No documento com uid x
        //     .get() // Pegue esse documento
        //     .then(doc => {
        //         // console.log(uid)
        //             return doc.data();
        //     })
    },
    remove: transaction => {
        return callApi({
            method: 'DELETE',
            url: `http://localhost:3000/transactions/${transaction.uid}`
        })
        // return firebase.firestore()
        //     .collection('transactions')
        //     .doc(transaction.uid)
        //     .delete()
    },
    save: transaction => {
        return firebase.firestore()
            .collection('transactions') // Para a coleção 'transactions'
            .add(transaction) // adiciona um novo documento com um novo id automático
    },
    update: transaction => {
        return firebase.firestore()
            .collection('transactions')
            .doc(getTransactionUid())
            .update(transaction)
    }
}

function callApi ({ method, url }) {
    return new Promise(async (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // Permite fazer chamadas usando AJAX

            // console.log(url)
            xhr.open( // Abre uma chamada ao backend
                method,
                url,
                true // Para ser assíncrona
            );

            // firebase.auth().onAuthStateChanged(user => {
            //     user.getIdToken().then(token => {
            //         console.log('Token', JSON.stringify(token))
            //         xhr.setRequestHeader('Authorization', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlODk1YzQ3YTA0YzVmNmRlMzExMmFmZjE2ODFhMzUwNzdkMWNjZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29udHJvbGUtZGUtZ2FzdG9zLTY2NjdhIiwiYXVkIjoiY29udHJvbGUtZGUtZ2FzdG9zLTY2NjdhIiwiYXV0aF90aW1lIjoxNzQ4Mzg5MjIxLCJ1c2VyX2lkIjoidjhqVHdJdGwwQ2U3bDE0NFhjV093TVFqQjkwMiIsInN1YiI6InY4alR3SXRsMENlN2wxNDRYY1dPd01RakI5MDIiLCJpYXQiOjE3NDg5Nzk2MDgsImV4cCI6MTc0ODk4MzIwOCwiZW1haWwiOiJtb2FuYWRsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1vYW5hZGxAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UOS4L3GpKWHXus9EbSGLf8jRdDqaU_C6WyJ40nHC0srTyZxmxuTie5HgKSaf51OsCOYOCzJSccKqW4PJjHnqyfkQ5JYAf3cDcKa2mpnt878UHPq1815vy6SaYEQqlS4ErBwy5zuvFFVQyZaN0nBmbyA50FjwB1av7jTC7-MxU6lQSebo34AzI8nRLsdX-ZWJAY27P4PuK2mE4ZZIqzzt5rawjrpb7IDNItHRRSe0hDKlQ4Cy3on5FmLJldZGfhMv6uvn5AOoBkR5IRsH4pp_NUshwlBMmT8VIVb4a-u556HrOgxnxcW2F7OskUoKzjzTTgWkubhKCuIVmDP-OdlglQ');
            //     });
            
            // });

            firebase.auth().currentUser.getIdToken().then(teste => console.log('Teste', teste));
            firebase.auth().currentUser
            // await firebase.auth().currentUser.getIdToken().then(token => {
                // console.log('Finalmente?', token);
                // xhr.setRequestHeader('Authorization', token);
            // })

            // xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken().then(token => console.log('batata', token)));
            xhr.setRequestHeader('Authorization', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlODk1YzQ3YTA0YzVmNmRlMzExMmFmZjE2ODFhMzUwNzdkMWNjZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29udHJvbGUtZGUtZ2FzdG9zLTY2NjdhIiwiYXVkIjoiY29udHJvbGUtZGUtZ2FzdG9zLTY2NjdhIiwiYXV0aF90aW1lIjoxNzQ4Mzg5MjIxLCJ1c2VyX2lkIjoidjhqVHdJdGwwQ2U3bDE0NFhjV093TVFqQjkwMiIsInN1YiI6InY4alR3SXRsMENlN2wxNDRYY1dPd01RakI5MDIiLCJpYXQiOjE3NDg5Nzk2MDgsImV4cCI6MTc0ODk4MzIwOCwiZW1haWwiOiJtb2FuYWRsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1vYW5hZGxAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UOS4L3GpKWHXus9EbSGLf8jRdDqaU_C6WyJ40nHC0srTyZxmxuTie5HgKSaf51OsCOYOCzJSccKqW4PJjHnqyfkQ5JYAf3cDcKa2mpnt878UHPq1815vy6SaYEQqlS4ErBwy5zuvFFVQyZaN0nBmbyA50FjwB1av7jTC7-MxU6lQSebo34AzI8nRLsdX-ZWJAY27P4PuK2mE4ZZIqzzt5rawjrpb7IDNItHRRSe0hDKlQ4Cy3on5FmLJldZGfhMv6uvn5AOoBkR5IRsH4pp_NUshwlBMmT8VIVb4a-u556HrOgxnxcW2F7OskUoKzjzTTgWkubhKCuIVmDP-OdlglQ');
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.onreadystatechange = function () { // Quando o estado de 'pronto' da minha chamada modificar...
                if (this.readyState == 4) {
                    const json = JSON.parse(this.responseText);
                    if (this.status != 200) {
                        reject(json);
                    } else {
                        resolve(json);
                    }
                }
                
            }

            xhr.send(); // Envia a chamada pro backend
        });
}
