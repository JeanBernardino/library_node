import express from 'express';
import BookController from '../controllers/booksControllers.js';
import paginate from '../middlewares/paginate.js';

const router = express.Router();

router.get('/books', BookController.listBooks, paginate);
router.get('/books/search', BookController.listBookByFilter, paginate);
router.get('/books/:id', BookController.listBookById);
router.post('/books', BookController.registerBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;