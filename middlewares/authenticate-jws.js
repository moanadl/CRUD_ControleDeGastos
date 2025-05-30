import admin from 'firebase-admin';

export async function authenticateToken (request, response, next) {
    const jwt = request.headers.authorization;

    if(!jwt) {
        response.status(401).json({message: 'Usuário não autorizado'});
        return;
    }

    let decodedIdToken = '';
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true); // Verifica se o JWT é válido e se ainda não expirou
    } catch (e){
        response.status(401).json({message: 'Usuário não autorizado'});
        return;
    }

    request.user = {
        uid: decodedIdToken.sub // A propriedade sub do JWT contém o uid do usuário
    }

    next();
}
