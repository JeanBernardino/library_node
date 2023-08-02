import ErrorNotFound from '../errors/ErrorNotFound.js';
import { authors } from '../models/index.js';

class AuthorController {

    static registerAuthor = async (req, res, next) => {
        try {
            const newAuthor = new authors(req.body);
            await newAuthor.save();

            const responseBody = {
                'data': newAuthor,
                'message': 'Author saved successfully.'
            };
            res.status(200).json(responseBody);
        } catch (error) {
            next(error);
        }
    };

    static listAuthors = async (req, res, next) => {
        try {
            const allAuthors = await authors.find();
            res.status(200).json(allAuthors);
        } catch (error) {
            next(error);
        }
    };

    static listAuthorById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const author = await authors.findById(id);
            
            if (author !== null) {
                res.status(200).json(author);
            } else {
                next(new ErrorNotFound('Author not found.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static updateAuthor = async (req, res, next) => {
        try {
            const { id } = req.params;
            const authorUpdated = await authors.findByIdAndUpdate(id, {$set: req.body});

            if (authorUpdated !== null) {
                res.status(200).json({
                    'data': null,
                    'message': 'Author updated successfully.'
                });
            } else {
                next(new ErrorNotFound('Author not found.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static deleteAuthor = async (req, res, next) => {
        try {
            const { id } = req.params;
            const authorDeleted = await authors.findByIdAndDelete(id);

            if (authorDeleted !== null) {
                res.status(200).json({
                    'data': null,
                    'message': 'Author deleted successfully.'
                });
            } else {
                next(new ErrorNotFound('Author not found.'));
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AuthorController;