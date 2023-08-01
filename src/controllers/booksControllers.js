import books from '../models/Book.js'

class BookController {

    static registerBook = async (req, res) => {
        try {
            const newBook = new books(req.body)
            await newBook.save()

            const responseBody = {
                'data': newBook,
                'message': 'Book saved successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static listBooks = async (req, res) => {
        try {
            const allBooks = await books.find().populate('author').exec()
            res.status(200).json(allBooks)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static listBookById = async (req, res) => {
        try {
            const { id } = req.params
            const book = await books.findById(id).populate('author').exec()
            res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static updateBook = async (req, res) => {
        try {
            const { id } = req.params
            await books.findByIdAndUpdate(id, {$set: req.body})

            const responseBody = {
                'data': null,
                'message': 'Book updated successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static deleteBook = async (req, res) => {
        try {
            const { id } = req.params
            await books.findByIdAndDelete(id)

            const responseBody = {
                'data': null,
                'message': 'Book deleted successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static listBookByPublisher = async (req, res) => {
        try {
            const { publisher } = req.query
            const book = await books.find({publisher: publisher}).populate('author').exec()
            res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default BookController