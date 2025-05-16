<!-- src/components/atoms/AtomAuthIcon.vue -->
<script setup lang="ts">
/**
 * AtomAuthIcon.vue
 *
 * Displays an authentication button:
 * - If not logged in: shows a "Log in" button
 * - If logged in: shows a "Go to account" button
 */

import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)
</script>

<template>
  <router-link
    :to="isLoggedIn ? { name: 'user' } : { name: 'login' }"
    class="auth-button"
    :aria-label="isLoggedIn ? 'Go to account' : 'Log in'"
  >
    <span class="material-symbols-outlined auth-button__icon">person</span>
    <span class="auth-button__text">
      {{ isLoggedIn ? 'Account' : 'Log in' }}
    </span>
  </router-link>
</template>

<style scoped lang="scss">
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

.auth-button {
  @include mix-flex-center(column);
  min-width: 48px;
  min-height: 48px;
  border-radius: fn-rem(4);
  outline: none;

  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    background-color 0.2s ease;

  @include mix-media(mobile) {
    padding: 0.1rem 0.25rem;
  }

  @include mix-media(tablet) {
    padding: 0.25rem 0.5rem;
  }

  &__icon {
    font-size: fn-rem(25);
    transition: transform 0.2s ease;
  }

  &__text {
    @include mix-visually-hidden();

    @include mix-media(mobile) {
      @include mix-unhide;
      font-size: fn-rem(14);
      transition: transform 0.2s ease;
    }

    @include mix-media(tablet) {
      font-size: fn-rem(16);
    }
  }
}

.auth-button:focus-visible {
  outline-offset: 0.2rem;
  outline: 1px solid var(--color-nav-light);
  background-color: var(--color-nav-light);
  color: var(--color-nav-dark);

  & .auth-button__icon {
    transform: scale(1.1);
  }

  & .auth-button__text {
    font-weight: var(--font-weight-semibold);
    transform: scale(1.1);
  }
}

.auth-button:active {
  animation: shrink 120ms ease-in-out;

  & .auth-button__icon,
  & .auth-button__text {
    animation: shrink 120ms ease-in-out;
  }
}

.auth-button:hover {
  background-color: var(--color-nav-light);
  color: var(--color-nav-dark);

  & .auth-button__icon {
    transform: scale(1.1);
  }

  & .auth-button__text {
    font-weight: var(--font-weight-semibold);
    transform: scale(1.1);
  }
}

.auth-button:disabled {
  display: none;
}
</style>
