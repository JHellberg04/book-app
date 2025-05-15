// @/composables/useLogin.ts

import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

/**
 * useLogin
 *
 * Handles user login using a reactive state object.
 * - Calls the auth store to perform login
 * - Tracks loading, error, and success state
 *
 * @returns Reactive state and login function
 */
export function useLogin() {
  const authStore = useAuthStore()

  // Reactive state for login process
  const state = reactive({
    error: '',
    success: false,
    loading: false,
  })

  /**
   * loginWithCredentials
   *
   * Submits the given credentials to the auth store for login.
   * Updates the reactive state based on the outcome.
   *
   * @param username - The username to log in with
   * @param password - The password to log in with
   */
  async function loginWithCredentials(username: string, password: string) {
    state.error = ''
    state.success = false
    state.loading = true

    try {
      await authStore.login(username, password)
      console.log('➡️ Sending to API:', { username, password }) // ⚠️ DEBUG ONLY
      state.success = true
    } catch (error: unknown) {
      if (typeof error === 'string') {
        state.error = error
      } else if (error instanceof Error) {
        state.error = error.message
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        state.error = String((error as any).message)
      } else {
        state.error = 'An unexpected error occurred during login.'
      }
    } finally {
      state.loading = false
    }
  }

  return {
    ...state,
    loginWithCredentials,
  }
}
