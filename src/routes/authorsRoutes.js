import express from 'express'
import AuthorController from '../controllers/authorsControllers.js'

const router = express.Router()

router.post('/authors', AuthorController.registerAuthor)
router.get('/authors', AuthorController.listAuthors)
router.get('/authors/:id', AuthorController.listAuthorById)
router.put('/authors/:id', AuthorController.updateAuthor)
router.delete('/authors/:id', AuthorController.deleteAuthor)

export default router