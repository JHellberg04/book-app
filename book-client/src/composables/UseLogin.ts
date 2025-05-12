// @/composables/useLogin.ts
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable function for managing the login process.
 * Exposes state variables and a handler function.
 */
export function useLogin() {
  /** The username input model */
  const username = ref('')

  /** The password input model */
  const password = ref('')

  /** Error message shown to the user, if any */
  const error = ref('')

  /** True if login was successful */
  const success = ref(false)

  /** True while login request is in progress */
  const loading = ref(false)

  const authStore = useAuthStore()

  /**
   * Attempts to log in the user using credentials.
   * Updates success, error, and loading states.
   */
  async function handleLogin() {
    error.value = ''
    success.value = false
    loading.value = true

    try {
      await authStore.login(username.value, password.value)
      success.value = true
    } catch (err: any) {
      error.value = err.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return {
    username,
    password,
    error,
    success,
    loading,
    handleLogin,
  }
}
