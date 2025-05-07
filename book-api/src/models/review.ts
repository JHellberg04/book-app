// === IMPORTS ===
import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  name: string
  content: string
  rating: number
  created_at: Date
}

// Mongoose schema for Review
const reviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  created_at: { type: Date, default: Date.now }
})

// Export the Review model
export const Review = mongoose.model<IReview>('Review', reviewSchema)
