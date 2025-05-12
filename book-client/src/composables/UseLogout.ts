// @/composables/useLogout.ts
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable for handling user logout.
 * Provides reactive state and a logout handler.
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
    } catch (err: any) {
      error.value = err.message || 'Failed to logout'
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
