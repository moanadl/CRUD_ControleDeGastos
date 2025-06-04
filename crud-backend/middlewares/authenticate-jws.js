import { UserNotAuthorizedError } from "./errors/user-not-authorized.error";

const error = new UserNotAuthorizedError();

export async function authenticateToken (request, response, next, auth) {
    const jwt = request.headers.authorization;

    if(!jwt) {
        response.status(error.code).json(error);
        return;
    }

    let decodedIdToken = '';
    try {
        decodedIdToken = await auth.verifyIdToken(jwt, true); // Verifica se o JWT é válido e se ainda não expirou
    } catch (e){
        response.status(error.code).json(error);
        return;
    }

    request.user = {
        uid: decodedIdToken.sub // A propriedade sub do JWT contém o uid do usuário
    }

    next();
}
