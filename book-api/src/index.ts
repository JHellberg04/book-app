// src/index.ts

// === IMPORTS ===
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// === ROUTES ===
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import reviewRoutes from './routes/review.routes.js'

// === CONFIG ===
dotenv.config()
const app = express()
const PORT = process.env.PORT

console.log('Mongo URI:', process.env.MONGO_URI)


// === MIDDLEWARE ===
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// === ROUTES ===
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/reviews', reviewRoutes)

// === ROOT TEST ===
app.get('/', (_req: Request, res: Response) => {
  res.send('Party API is running 🎉')
})

// === DATABASE CONNECTION + SERVER START ===
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('🎉 Connected to MongoDB')
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
  })
