import { defineStore } from 'pinia'

/**
 * Authentication store to manage user sessions and roles.
 * Handles login, logout, session persistence and role decoding.
 */
export const useAuthStore = defineStore('authStore', {
  // State holds reactive data
  state: () => ({
    /** JWT token for the logged-in user, null when logged out */
    token: null as string | null,

    /** Whether the user is an admin, derived from the JWT token */
    isAdmin: false,
  }),

  // Getters are like computed properties
  getters: {
    /**
     * Checks if the user is currently logged in.
     * @returns {boolean} true if token exists
     */
    isLoggedIn: (state) => !!state.token,
  },

  // Actions handle logic and can be async
  actions: {
    /**
     * Logs in the user and sets token and role.
     * @param username - User's username
     * @param password - User's password
     * @throws Error if login fails
     */
    async login(username: string, password: string) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Login failed')

        this.token = data.token
        this.isAdmin = this.decodeIsAdminFromToken(data.token)

        localStorage.setItem('token', data.token)
      } catch (err: any) {
        console.error('Login failed:', err.message)
        throw err
      }
    },

    /**
     * Logs out the current user by clearing token and role.
     * Also notifies the backend to clear session cookie.
     */
    logout() {
      fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      this.token = null
      this.isAdmin = false
      localStorage.removeItem('token')
    },

    /**
     * Decodes the JWT token and checks for admin status.
     * @param token - The JWT token string
     * @returns {boolean} true if user is admin
     */
    decodeIsAdminFromToken(token: string): boolean {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.is_admin === true
      } catch (err) {
        console.error('Failed to decode token:', err)
        return false
      }
    },

    /**
     * Restores session state from localStorage.
     * Should be called once on app startup.
     */
    restoreSession() {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        this.token = storedToken
        this.isAdmin = this.decodeIsAdminFromToken(storedToken)
      }
    },
  },
})
