import ErrorBase from './ErrorBase.js';

class ErrorRequest extends ErrorBase {
    constructor(message = 'One or more data is incorrect.') {
        super(message, 400);
    }
}

export default ErrorRequest;