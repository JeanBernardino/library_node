import ErrorNotFound from '../errors/ErrorNotFound.js';

//eslint-disable-next-line no-unused-vars
function notFoundManipulator(req, res, next) {
    const errorNotFound = new ErrorNotFound();
    next(errorNotFound);
}

export default notFoundManipulator;