<!-- AtomAuthIcon.vue -->
<script setup lang="ts">
/**
 * This component displays either:
 * - a login button if user is not logged in
 * - an account link if the user is authenticated
 */

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

// Access auth state from store
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)
</script>

<template>
  <!-- Router link updates dynamically based on login state -->
  <router-link
    :to="isLoggedIn ? '/account' : '/account/login'"
    class="auth-button"
    :aria-label="isLoggedIn ? 'Gå till konto' : 'Logga in'"
  >
    <!-- Icon representing user/account -->
    <span class="material-symbols-outlined auth-button__icon">person</span>

    <!-- Button text changes based on login state -->
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
