// ----- If user is not logged send them to index.html ----- //
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = '../../index.html';
    };
});
