import { Router } from 'express'

// == Auth middleware ==
import { verifyAccessToken } from '../middleware/verifyToken.js'

// == Controller functions ==
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById
} from '../controllers/review.controller.js'

// == Create router ==
const router = Router()

// === Routes ===
router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', createReview)
router.patch('/:id', verifyAccessToken, updateReviewById)
router.delete('/:id', verifyAccessToken, deleteReviewById)

export default router
