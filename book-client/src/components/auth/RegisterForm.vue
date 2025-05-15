<!-- src/components/auth/RegisterForm.vue -->
<script setup lang="ts">
/**
 * RegisterForm.vue
 *
 * A simplified registration form for creating new user accounts.
 * - Uses reactive state to bind form inputs
 * - Validates username and password with imported rules
 * - Handles registration through the `useRegister` composable
 * - Displays real-time error and success messages
 *
 * @component
 */

import { reactive } from 'vue'

// === Validation & Registration Logic ===
import { validateUsername, validatePassword } from '@/composables/authValidation'
import { useRegister } from '@/composables/useRegister'

// === UI Components ===
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseAction.vue'

// === Reactive form data ===
const formData = reactive({
  username: '',
  password: '',
})

// === Registration logic ===
const { error, success, loading, registerWithCredentials } = useRegister()

/**
 * Handles form submission:
 * - Validates input fields
 * - If valid, calls registration composable
 * - Displays error messages on validation failure
 */
async function onSubmit() {
  const userError = validateUsername(formData.username)
  const passError = validatePassword(formData.password)

  if (userError || passError) {
    console.warn('Validation failed:', userError || passError)
    alert(userError || passError) // TEMP: Replace with UI feedback component if needed
    return
  }

  await registerWithCredentials(formData.username.toLowerCase(), formData.password)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Username field with validation -->
    <BaseInput
      id="username"
      name="Username"
      v-model="formData.username"
      placeholder="Enter username"
      info="3–20 lowercase letters, numbers, - or _"
      :validate="validateUsername"
    />

    <!-- Password field with validation -->
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
    <p v-if="success" class="success-msg">🎉 Account created! You can now log in.</p>

    <!-- Submit button -->
    <BaseButton
      type="submit"
      :label="loading ? 'Registering...' : 'Register'"
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
