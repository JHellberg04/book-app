<!-- src/components/auth/LoginForm.vue -->

<script setup lang="ts">
/**
 * LoginForm.vue
 *
 * A login form for user authentication.
 * - Uses reactive state for form data
 * - Validates inputs with custom rules
 * - Uses a login composable to handle API interaction
 * - Displays validation and success messages
 *
 * @component
 */

import { reactive } from 'vue'

// === Logic ===
import { validateUsername, validatePassword } from '@/composables/authValidation'
import { useLogin } from '@/composables/useLogin'

// === UI Components ===
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseAction.vue'

// === Reactive form data ===
const formData = reactive({
  username: '',
  password: '',
})

// === Login logic ===
const { error, success, loading, loginWithCredentials } = useLogin()

/**
 * Handles form submission:
 * - Validates input
 * - Calls login composable with credentials
 */
async function onSubmit() {
  const userError = validateUsername(formData.username)
  const passError = validatePassword(formData.password)

  if (userError || passError) {
    console.warn(' Validation failed:', userError || passError)
    alert(userError || passError)
    return
  }

  await loginWithCredentials(formData.username.toLowerCase(), formData.password)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Username field -->
    <BaseInput
      id="username"
      name="Username"
      v-model="formData.username"
      placeholder="Enter username"
      info="3–20 lowercase letters, numbers, - or _"
      :validate="validateUsername"
    />

    <!-- Password field -->
    <BaseInput
      id="password"
      name="Password"
      type="password"
      v-model="formData.password"
      placeholder="Enter password"
      info="8–20 characters, one uppercase letter and one special character"
      :validate="validatePassword"
    />

    <!-- Feedback messages / temporary-->
    <p v-if="error" class="error-msg">{{ error }}</p>
    <p v-if="success" class="success-msg">🎉 Logged in successfully</p>

    <!-- Submit button -->
    <BaseButton
      type="submit"
      :label="loading ? 'Logging in...' : 'Log In'"
      :disabled="loading"
      variant="primary"
    />
  </form>
</template>

<style scoped lang="scss">
form {
  width: 100%;
  @include mix-flex-center(column, 1rem);
}

.error-msg {
  color: var(--color-feedback-invalid-text);
  text-align: center;
}

.success-msg {
  color: var(--color-feedback-success-text);
  text-align: center;
}
</style>
