<!-- components/fixtures/header/MoleculeHeaderNav.vue -->
<script setup lang="ts">
/**
 * HeaderNav - Navigation shown when user is logged in.
 */
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/UseLogout'
import NavLink from './AtomNavLink.vue'

const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)

const { handleLogout, loading } = useLogout()
</script>

<template>
  <!-- Only show this nav if user is logged in -->
  <div v-if="isLoggedIn" class="pagenav">
    <!-- Books link -->
    <NavLink class="pagenav__link" :to="{ name: 'books' }" label="Books" />

    <!-- Logout button -->
    <button class="pagenav__link" @click="handleLogout" :disabled="loading">Log out</button>
  </div>
</template>

<style scoped lang="scss">
.pagenav {
  display: flex;
  width: 100%;
  gap: 1rem;
  padding: 0.25rem;
  justify-content: flex-end;
  align-items: center;

  @include mix-media(tablet) {
    min-width: fn-rem(390);
  }

  &__link {
    cursor: pointer;

    &:hover {
      background-color: var(--color-nav-light);
      color: var(--color-nav-dark);
    }
  }

  &:focus {
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);
    outline: 1px solid;
    outline-offset: fn-rem(3);
    outline-color: var(--color-nav-light);
  }

  & .active {
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);
  }
}
</style>
