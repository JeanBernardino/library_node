import express from 'express';
import BookController from '../controllers/booksControllers.js';

const router = express.Router();

router.get('/books', BookController.listBooks);
router.get('/books/search', BookController.listBookByFilter);
router.get('/books/:id', BookController.listBookById);
router.post('/books', BookController.registerBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;