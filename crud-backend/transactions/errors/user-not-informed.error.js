export class UserNotInformedError extends Error { // Vai ser uma extensão da classe Error do JS

    constructor () {
        super("Usuário não informado"); // O construtor de Error espera uma mensagem como argumento. Basicamente estamos pedindo “Ei, classe Error, crie a parte padrão do erro com essa mensagem.”
        this.name = 'user-not-informed';
        this.code = 500;
    }
}
