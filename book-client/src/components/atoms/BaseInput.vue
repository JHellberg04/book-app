<script setup lang="ts">
import { ref } from 'vue'

/**
 * === Props ===
 * - id, name: used for input and label association
 * - modelValue: bound value via v-model
 * - info: optional help text shown on focus
 * - validate: optional validation function returning an error message or null
 * - type: input type (e.g. text, email, password, number, date, etc.)
 * - min, max, step: for numeric/date inputs
 */
const props = defineProps<{
  id: string
  name: string
  modelValue: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  info?: string
  validate?: (val: string) => string | null
  type?: string
  min?: string | number
  max?: string | number
  step?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isFocused = ref(false)
const feedback = ref('')
const status = ref<'info' | 'error' | 'success' | null>(null)

const onFocus = () => {
  isFocused.value = true
  if (props.info) {
    feedback.value = props.info
    status.value = 'info'
  }
}

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)

  if (props.validate) {
    const msg = props.validate(value)
    if (msg) {
      feedback.value = msg
      status.value = 'error'
    } else {
      feedback.value = ''
      status.value = 'success'
    }
  }
}

const onBlur = () => {
  isFocused.value = false
  if (!props.validate && props.info) {
    feedback.value = ''
    status.value = null
  }
}
</script>

<template>
  <div
    class="inputfield"
    :class="{
      isInfo: status === 'info',
      isInvalid: status === 'error',
      isValid: status === 'success',
    }"
  >
    <label class="inputfield__label" :for="id">{{ name }}</label>
    <p class="inputfield__feedback">{{ feedback }}</p>

    <input
      class="inputfield__field"
      :id="id"
      :name="name"
      :type="type || 'text'"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
    />
  </div>
</template>

<style scoped lang="scss">
// === Base Input ===
.inputfield {
  width: 100%;
  min-width: fn-rem(200);
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: fn-rem(4);

  &__label {
    width: 100%;
  }

  &__feedback {
    @include mix-visually-hidden;
  }

  &__field {
    width: 100%;
    padding: 0.1rem 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid;
    border-color: var(--color-input-border-default);
    background-color: var(--color-input-bg);

    &::placeholder {
      font-size: var(--font-size-xs);
      font-family: var(--font-secondary);
      color: var(--color-placeholder-text);
      font-weight: var(--font-weight-light);
      font-style: italic;

      @include mix-media(tablet) {
        font-size: var(--font-size-s);
      }

      @include mix-media(laptop) {
        font-size: var(--font-size-m);
      }
    }

    &:hover {
      border-color: var(--color-input-border-hover);
    }

    &:focus {
      outline-offset: 0.15rem;
      outline: 2px solid;
      outline-color: var(--color-input-border-focus);
    }

    &:disabled {
      background-color: var(--color-input-disabled-bg);
      cursor: not-allowed;
    }
  }
}

// === Validation States ===
.isValid {
  .inputfield__field {
    border-color: var(--color-feedback-valid-focus);

    &:focus {
      outline-color: var(--color-feedback-valid-focus);
    }
  }
}

.isInvalid {
  .inputfield__field {
    border-color: var(--color-feedback-invalid-focus);

    &:focus {
      outline-color: var(--color-feedback-invalid-focus);
    }
  }

  .inputfield__feedback {
    @include mix-unhide;
    border-radius: fn-rem(4);
    padding: 0.25rem;
    background-color: var(--color-feedback-bg-invalid);
    color: var(--color-feedback-invalid-text);
  }
}

.isInfo {
  .inputfield__feedback {
    @include mix-unhide;
    padding: 0.25rem;
    background-color: var(--color-feedback-bg-info);
  }
}
</style>
