import ErrorRequest from './ErrorRequest.js';

class ErrorValidator extends ErrorRequest {
    constructor(error) {
        const errorMessages = Object.values(error.errors)
            .map(error => error.message).join('; ');

        super(errorMessages, 400);
    }
}

export default ErrorValidator;