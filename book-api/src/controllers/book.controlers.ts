import { Request, Response } from 'express';
import mongoose from 'mongoose';
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

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid Book ID format'});
    return;
  }

  try {
    const book = await Book.findById(id)//.populate('Review');

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('❌ Error fetching book:', error);
    res.status(500).json({ error: 'Server error fetching book' });
  }
}