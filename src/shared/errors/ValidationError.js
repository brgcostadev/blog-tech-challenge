class ValidationError extends Error {
    constructor(message, camposFaltando) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
        if (camposFaltando) this.camposFaltando = camposFaltando;
    }
}
module.exports = ValidationError;
