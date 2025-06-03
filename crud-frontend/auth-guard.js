firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = '../../index.html'; // Tá com esse path porque quem chama é o JS das pages
    }
})
