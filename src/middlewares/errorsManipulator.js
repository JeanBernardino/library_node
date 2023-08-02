import mongoose from 'mongoose';
import ErrorBase from '../errors/ErrorBase.js';
import ErrorRequest from '../errors/ErrorRequest.js';
import ErrorValidator from '../errors/ErrorValidator.js';
import ErrorNotFound from '../errors/ErrorNotFound.js';

//eslint-disable-next-line no-unused-vars
function errosManipulator(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
        new ErrorRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ErrorValidator(error).sendResponse(res);
    } else if (error instanceof ErrorNotFound) {
        error.sendResponse(res);
    } else {
        new ErrorBase().sendResponse(res);
    }
}

export default errosManipulator;