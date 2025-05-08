// === IMPORTS ===
import { Request, Response } from 'express'
import { Review } from '../models/review.js'
import { IReview } from '../types/IReview.js'
import { Document } from 'mongoose'
import Book from '../models/book.js'



/** === GET ALL REVIEWS === */
export async function getAllReviews(_req: Request, res: Response) {
  try {
    const reviews = await Review.find()
    res.status(200).json(reviews)
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    res.status(500).json({ error: 'Server failed to fetch reviews' })
  }
}

/** === GET REVIEW BY ID === */
export async function getReviewById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }
    res.status(200).json(review)
  } catch (error) {
    console.error('❌ Error fetching review by ID:', error)
    res.status(500).json({ error: 'Server error' })
  }
}


/** === CREATE NEW REVIEW === */
export async function createReview(req: Request, res: Response) {
  const { name, content, rating, book } = req.body;

  try {
    // Validate that the book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    // Skapa en ny review och typisera den som ett Mongoose-dokument med IReview
    const newReview: Document & IReview = new Review({
      name,
      content,
      rating,
      book,
      created_at: new Date(),
    });

    bookExists.reviews.push(newReview._id as any);
    await bookExists.save();

    await newReview.save();  // save kommer nu att fungera
    res.status(201).json(newReview);
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(400).json({ error: 'Invalid review data' });
  }
}

/** === UPDATE REVIEW BY ID === */
export async function updateReviewById(req: Request, res: Response) {
  const { id } = req.params
  const { name, content, rating } = req.body

  try {
    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }

    if (name) review.name = name
    if (content) review.content = content
    if (rating) review.rating = rating

    await review.save()

    res.status(200).json({ message: 'Review updated successfully', review })
  } catch (error) {
    console.error('❌ Error updating review:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === DELETE REVIEW BY ID === */
export async function deleteReviewById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }

    await Review.findByIdAndDelete(id)
    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting review:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
