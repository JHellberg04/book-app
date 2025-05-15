<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseAction.vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  formRef: any
  label?: string
  variant?: 'primary' | 'secondary'
}>()

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const username = props.formRef?.formData?.username
    const password = props.formRef?.formData?.password

    if (!username || !password) throw new Error('Missing credentials')

    const authStore = useAuthStore()
    await authStore.login(username, password)
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="ask">
    <p v-if="error" class="error-msg">{{ error }}</p>
    <BaseButton
      :label="loading ? 'Logging in...' : label || 'Log In'"
      :variant="variant || 'primary'"
      as="button"
      type="button"
      :disabled="loading"
      @click="handleLogin"
    />
  </div>
</template>

<style scoped lang="scss">
.ask {
  margin: 1rem 0;
  width: 100%;
  @include mix-flex-center(column, 1.5rem);
}

.error-msg {
  color: var(--color-feedback-invalid-text);
  font-size: 24px;
}
</style>
