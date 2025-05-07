// src/controllers/users.controller.ts

// === IMPORTS ===

// == Types ==
import { Request, Response } from 'express'

// == Security libraries ==
import bcrypt from 'bcryptjs' // For hashing and comparing passwords

// == Database model ==
import User from '../models/user.js'

/** === GET ALL USERS ===
 * - Fetches all users from the database
 * - Returns only selected fields (username, is_admin)
 *
 * @param res - Express response object
 */
export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    res.status(500).json({ error: 'Server failed to fetch users' })
  }
}

/** === GET USER BY ID ===
 *
 * - Extracts user ID from request params
 * - Finds a single user in the database using MongoDB's ObjectId
 * - Returns selected fields: username, is_admin, and created_at
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 200 with user data, 404 if not found, 500 on server error
 *
 */
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await User.findById(id).select('username is_admin created_at')
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('❌ Error fetching user by ID:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === UPDATE USER BY ID ===
 *
 * - Extracts user ID from request params
 * - Validates that the user exists in the database
 * - Applies updates from the request body (e.g. username or password)
 * - If password is updated, hashes it with bcrypt before saving
 * - Returns 200 with updated user info or appropriate error code
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 200 on success, 404 if user not found, 500 on server error
 */
export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params
  const { username, password } = req.body

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    if (username) user.username = username
    if (password) user.password = await bcrypt.hash(password, 10)

    await user.save()

    res.status(200).json({ message: 'User updated successfully', user })
  } catch (error) {
    console.error('❌ Error updating user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === DELETE USER BY ID ===
 *
 * - Extracts user ID from request params
 * - Looks up the user in the database to verify existence
 * - If found, deletes the user using MongoDB's ObjectId
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns 200 on success, 404 if not found, 500 on server error
 *
 */
export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    await User.findByIdAndDelete(id)

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
