import ErrorBase from './ErrorBase.js';

class ErrorNotFound extends ErrorBase {
    constructor(message = 'Route not found.'){
        super(message, 404);
    }
}

export default ErrorNotFound;