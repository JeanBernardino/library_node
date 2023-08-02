import ErrorNotFound from '../errors/ErrorNotFound.js';
import { authors, books } from '../models/index.js';

class BookController {

    static registerBook = async (req, res, next) => {
        try {
            const newBook = new books(req.body);
            await newBook.save();

            const responseBody = {
                'data': newBook,
                'message': 'Book saved successfully.'
            };
            res.status(200).json(responseBody);
        } catch (error) {
            next(error);
        }
    };

    static listBooks = async (req, res, next) => {
        try {
            const allBooks = await books.find().populate('author').exec();
            res.status(200).json(allBooks);
        } catch (error) {
            next(error);
        }
    };

    static listBookById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const book = await books.findById(id).populate('author').exec();

            if (book !== null) {
                res.status(200).json(book);
            } else {
                next(new ErrorNotFound('Book not found.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static updateBook = async (req, res, next) => {
        try {
            const { id } = req.params;
            const bookUpdated = await books.findByIdAndUpdate(id, {$set: req.body});

            if (bookUpdated !== null) {
                res.status(200).json({
                    'data': null,
                    'message': 'Book updated successfully.'
                });
            } else {
                next(new ErrorNotFound('Book not found.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static deleteBook = async (req, res, next) => {
        try {
            const { id } = req.params;
            const bookDeleted = await books.findByIdAndDelete(id);

            if (bookDeleted !== null) {
                res.status(200).json({
                    'data': null,
                    'message': 'Book deleted successfully.'
                });
            } else {
                next(new ErrorNotFound('Book not found.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static listBookByFilter = async (req, res, next) => {
        try {
            const filter = await filterSearch(req.query);

            if (filter !== null) {
                const bookList = await books.find(filter).populate('author').exec();
                res.status(200).json(bookList);
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            next(error);
        }
    };
}

async function filterSearch(params) {
    const { title, publisher, minPages, maxPages, authorName } = params;
    let filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (publisher) filter.publisher = { $regex: publisher, $options: 'i' };

    if (minPages) filter.minPages.$gte = minPages;
    if (maxPages) filter.maxPages.$gte = maxPages;

    if (authorName) {
        const author = await authors.findOne({name: authorName});

        if (author !== null){
            filter.author = author._id;
        } else {
            filter = null;
        }
    }

    return filter;
}

export default BookController;