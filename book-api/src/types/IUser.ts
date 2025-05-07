// src/types/IUser.ts

// Type definition for a User document
export interface IUser {
  username: string
  password: string
  is_admin: boolean
  created_at: Date
}
