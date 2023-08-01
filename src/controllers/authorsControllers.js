import authors from '../models/Author.js'

class AuthorController {

    static registerAuthor = async (req, res) => {
        try {
            const newAuthor = new authors(req.body)
            await newAuthor.save()

            const responseBody = {
                'data': newAuthor,
                'message': 'Author saved successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static listAuthors = async (req, res) => {
        try {
            const allAuthors = await authors.find()
            res.status(200).json(allAuthors)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static listAuthorById = async (req, res) => {
        try {
            const { id } = req.params
            const author = await authors.findById(id)
            res.status(200).json(author)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static updateAuthor = async (req, res) => {
        try {
            const { id } = req.params
            await authors.findByIdAndUpdate(id, {$set: req.body})

            const responseBody = {
                'data': null,
                'message': 'Author updated successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    static deleteAuthor = async (req, res) => {
        try {
            const { id } = req.params
            await authors.findByIdAndDelete(id)

            const responseBody = {
                'data': null,
                'message': 'Author deleted successfully'
            }
            res.status(200).json(responseBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default AuthorController