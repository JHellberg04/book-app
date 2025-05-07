import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook } from '../controllers/book.controllers.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', verifyAccessToken, createBook);
router.post('/:id', verifyAccessToken, updateBook);

export default router;