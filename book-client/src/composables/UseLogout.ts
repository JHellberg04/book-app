// @/composables/useLogout.ts

import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

/**
 * useLogout
 *
 * Composable for handling user logout.
 * Provides reactive state and a logout handler.
 *
 * @returns Object containing loading, error, success and logout function
 */
export function useLogout() {
  /** True while logout request is in progress */
  const loading = ref(false)

  /** Error message if logout fails */
  const error = ref('')

  /** True if logout was successful */
  const success = ref(false)

  const authStore = useAuthStore()

  /**
   * handleLogout
   *
   * Logs out the current user by calling the auth store's logout function.
   * Manages loading, error, and success state.
   */
  async function handleLogout() {
    loading.value = true
    error.value = ''
    success.value = false

    try {
      await authStore.logout()
      success.value = true
    } catch (errorThrown: unknown) {
      if (typeof errorThrown === 'string') {
        error.value = errorThrown
      } else if (errorThrown instanceof Error) {
        error.value = errorThrown.message
      } else if (
        typeof errorThrown === 'object' &&
        errorThrown !== null &&
        'message' in errorThrown
      ) {
        error.value = String((errorThrown as any).message)
      } else {
        error.value = 'An unexpected error occurred during logout.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    handleLogout,
  }
}
