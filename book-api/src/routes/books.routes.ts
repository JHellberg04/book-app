import express from 'express';
import { getAllBooks, getBookById, createBook } from '../controllers/book.controllers.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', verifyAccessToken, createBook);

export default router;