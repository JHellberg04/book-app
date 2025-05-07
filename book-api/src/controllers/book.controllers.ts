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

export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      author,
      genres,
      image,
      published_year
    } = req.body;

    const newBook = new Book({
      title,
      description,
      author,
      genres,
      image,
      published_year,
      reviews: []
    });

    const savedBook = await newBook.save();

    res.status(201).json({message: 'Book created!', savedBook});
  } catch (error) {
    console.error('❌ Error creating book:', error);
    res.status(500).json({ error: 'Server error creating book' });
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found'});
      return;
    }

    res.status(200).json({ message: 'Book succesfully updated', updatedBook });
  } catch (error) {
    console.error('❌ Error updating book:', error);
    res.status(500).json({ error: 'Server error updating book' });
  }
}