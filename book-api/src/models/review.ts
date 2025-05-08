// === IMPORTS ===
import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IReview extends Document {
  name: string
  content: string
  rating: number
  created_at: Date
  book: Types.ObjectId[];
}

// Mongoose schema for Review
const reviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  created_at: { type: Date, default: Date.now },
  book: { type: [Schema.Types.ObjectId], ref: "Book", required: true }
})

// Export the Review model
export const Review = mongoose.model<IReview>('Review', reviewSchema)
