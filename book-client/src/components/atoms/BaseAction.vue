<script setup lang="ts">
/**
 * Props:
 * - as: determines which tag to render (default is 'button')
 * - type: only applies when tag is 'button'
 * - href: only applies when tag is 'a'
 * - label: visible button text
 * - variant: styling variant, e.g. "primary" or "secondary"
 */
defineProps<{
  as?: 'button' | 'a'
  type?: 'button' | 'submit' | 'reset'
  href?: string
  label: string
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <component
    :is="as || 'button'"
    :type="as === 'button' ? type || 'button' : undefined"
    :href="as === 'a' ? href : undefined"
    :class="['action', variant]"
  >
    <span>{{ label }}</span>
  </component>
</template>

<style scoped lang="scss">
// === Animation ===
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

// === Base Button ===
.action {
  // === Layout ===
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;

  // === Text styles ===
  font-family: var(--font-secondary);
  font-weight: var(--font-semibold);
  font-size: fn-rem(20);
  letter-spacing: 0.05rem;
  text-transform: uppercase;

  // === Transitions ===
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    background-color 0.2s ease;

  // === Inner span ===
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease;
  }

  // === Hover/focus/active states ===
  &:hover span,
  &:focus span {
    transform: scale(1.1);
  }

  &:active {
    animation: shrink 120ms ease-in-out;
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-focus-outline, white);
    outline-offset: 0.2rem;
  }

  &:disabled {
    background-color: var(--color-action-disabled);
    color: var(--color-black);
  }

  // === Variant: Primary ===
  &.primary {
    background-color: var(--color-action-primary);
    color: var(--color-text-dark);

    &:hover {
      background-color: var(--color-action-primary-hover);
    }

    &:focus-visible {
      background-color: var(--color-action-primary-hover);
      outline-color: var(--color-action-primary-focus);
    }
  }

  // === Variant: Secondary ===
  &.secondary {
    background-color: var(--color-action-secondary);
    color: var(--color-text-light);

    &:hover {
      background-color: var(--color-action-secondary-hover);
    }

    &:focus-visible {
      background-color: var(--color-action-secondary-hover);
      outline-color: var(--color-action-secondary-focus);
    }
  }
}
</style>
