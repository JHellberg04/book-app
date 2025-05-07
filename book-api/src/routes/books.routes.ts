import express from 'express';
import { getAllBooks } from '../controllers/book.controlers.js';

const router = express.Router();

router.get('/', getAllBooks);

export default router;