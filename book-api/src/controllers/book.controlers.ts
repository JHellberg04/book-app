import { Request, Response } from 'express';
import Book from '../models/book.js';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('❌ Error finding books:', error)
    res.status(500).json({ error: 'Server error finding all books' })
  }
};