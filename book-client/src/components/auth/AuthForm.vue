<script setup lang="ts">
import { reactive } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'

const props = defineProps<{
  onSubmitHandler?: (username: string, password: string) => void
}>()

// Reactive state for form fields
const formData = reactive({
  username: '',
  password: '',
})

// Custom validation logic for username
const usernameRules = (val: string) => {
  const regex = /^[a-z0-9_-]{3,20}$/
  if (!val) return 'Username is required'
  if (!regex.test(val)) return 'Use 3–20 lowercase letters, numbers, - or _'
  return null
}

// Custom validation logic for password
const passwordRules = (val: string) => {
  if (!val) return 'Password is required'
  if (val.length < 8 || val.length > 20) return '8–20 characters required'
  if (!/[A-Z]/.test(val)) return 'Include at least one uppercase letter'
  if (!/[^A-Za-z0-9]/.test(val)) return 'Include at least one special character'
  return null
}

// Handles form submit with validation
const onSubmit = () => {
  const userError = usernameRules(formData.username)
  const passError = passwordRules(formData.password)
  if (userError || passError) {
    console.warn('Validation failed')
    return
  }

  // Lowercase the username before submitting
  props.onSubmitHandler?.(formData.username.toLowerCase(), formData.password)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <BaseInput
      id="username"
      name="Username"
      v-model="formData.username"
      placeholder="Enter username"
      info="3–20 lowercase letters, numbers, - or _"
      :validate="usernameRules"
    />

    <BaseInput
      id="password"
      name="Password"
      type="password"
      v-model="formData.password"
      placeholder="Enter password"
      info="8–20 characters, one uppercase letter and one special character"
      :validate="passwordRules"
    />

    <slot name="authaction"></slot>
  </form>
</template>

<style scoped lang="scss">
form {
  width: 100%;
  @include mix-flex-center(column, 1rem);
}
</style>
