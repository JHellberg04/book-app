// @/composables/useRegister.ts
import { ref } from 'vue'

/**
 * Composable function for handling registration process.
 */
export function useRegister() {
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const success = ref(false)
  const loading = ref(false)

  async function handleRegister() {
    error.value = ''
    success.value = false
    loading.value = true

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Registration failed')

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
    handleRegister,
  }
}
