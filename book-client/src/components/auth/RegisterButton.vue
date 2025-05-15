<script setup lang="ts">
import { useRegister } from '@/composables/useRegister'
import BaseButton from '@/components/atoms/BaseAction.vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary'
  label?: string
}>()

const { username, password, error, loading, success, handleRegister } = useRegister()

defineExpose({ username, password }) // så parent kan binda
</script>

<template>
  <div class="register-button">
    <p v-if="error" class="error-msg">{{ error }}</p>
    <p v-if="success" class="success-msg">🎉 Account created! You can now log in.</p>

    <BaseButton
      :label="loading ? 'Registering...' : label || 'Register'"
      :variant="variant || 'primary'"
      as="button"
      type="button"
      :disabled="loading"
      @click="handleRegister"
    />
  </div>
</template>

<style scoped lang="scss">
.register-button {
  margin: 1rem 0;
  width: 100%;
  @include mix-flex-center(column, 1.5rem);
}

.error-msg {
  color: var(--color-feedback-invalid-text);
  font-size: 1rem;
  text-align: center;
}

.success-msg {
  color: var(--color-feedback-success-text);
  font-size: 1rem;
  text-align: center;
}
</style>
