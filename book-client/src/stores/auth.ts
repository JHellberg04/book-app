import { defineStore } from 'pinia'

/**
 * Authentication store to manage user sessions and roles.
 * Handles login, logout, session persistence and role decoding.
 */
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null as string | null,
    isAdmin: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
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

    logout() {
      fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      this.token = null
      this.isAdmin = false
      localStorage.removeItem('token')
    },

    decodeIsAdminFromToken(token: string): boolean {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.is_admin === true
      } catch (err) {
        console.error('Failed to decode token:', err)
        return false
      }
    },

    restoreSession() {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        this.token = storedToken
        this.isAdmin = this.decodeIsAdminFromToken(storedToken)
      }
    },

    /**
     * Fake login for development.
     * @param asAdmin - true for admin role, false for regular user
     */
    fakeLogin(asAdmin: boolean) {
      this.token = 'mock.token.value'
      this.isAdmin = asAdmin
      localStorage.setItem('token', this.token)
    },
  },
})
