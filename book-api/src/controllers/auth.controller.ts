// src/controllers/auth.controller.ts

// === IMPORTS ===

// == Types ==
import { Request, Response } from 'express'

// == Security libraries ==
import bcrypt from 'bcryptjs' // For hashing and comparing passwords
import jwt from 'jsonwebtoken' // For generating JSON Web Tokens

// == Database model ==
import User from '../models/user.js'

/** === REGISTER NEW USER ===
 *
 * - Takes `username` and `password` from request body
 * - Checks if the username is already taken
 * - Hashes the password using bcrypt
 * - Creates and saves a new user in the database
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 201 on success, 409 if username exists, 500 on server error
 */
export async function registerNewUser(req: Request, res: Response) {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      res.status(409).json({ error: 'Username already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('❌ Registration error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
}

/** === LOG IN USER ===
 *
 * - Takes `username` and `password` from request body
 * - Validates input
 * - Looks up user in MongoDB
 * - Verifies hashed password using bcrypt
 * - Generates JWT token valid for 1 hour
 * - Sends token as httpOnly cookie and in JSON response
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 200 on success, 401 on failure
 */
export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' })
    return
  }

  try {
    const user = await User.findOne({ username })

    if (!user) {
      res.status(409).json({ error: 'No user with this username exists' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    )

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({
      message: 'You are logged in',
      token: accessToken,
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ error: 'Server error during login' })
  }
}

/** === LOG OUT USER ===
 *
 * - Clears the accessToken cookie to log out the user
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 200 on success
 */
export function logoutUser(_req: Request, res: Response) {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  })
  res.status(200).json({ message: 'User logged out' })
}
