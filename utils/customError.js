class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.description = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ApiValidationError extends CustomError {
    constructor(errorObj) {
        super('Api validation error');

        this.errors = errorObj;
    }
}
class TokenValidationError extends CustomError {
    constructor(message) {
        super('token validation error', message)
    }
}

module.exports = {
    CustomError,
    ApiValidationError,
    TokenValidationError
};
