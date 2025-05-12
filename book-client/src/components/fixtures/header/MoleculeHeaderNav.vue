<script setup lang="ts">
/**
 * MoleculeHeaderNav
 * Shows navigation links conditionally based on user auth state.
 * - Only visible if user is logged in
 * - Admin users see the "Users" link
 * - Logout button triggers useLogout composable
 */

import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/UseLogout'
import NavLink from './AtomNavLink.vue'

const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)
const isAdmin = computed(() => auth.isAdmin)

const { handleLogout, loading } = useLogout()
</script>

<template>
  <!-- Only show this nav if user is logged in -->
  <div v-if="isLoggedIn" class="pagenav">
    <!-- Admin-only link -->
    <NavLink v-if="isAdmin" class="pagenav__link" to="/account/admin/users" label="Users" />

    <!-- All logged-in users -->
    <NavLink class="pagenav__link" to="/review" label="Reviews" />
    <NavLink class="pagenav__link" to="/bookshelf" label="Books" />

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
