<!-- components/fixtures/header/OrganismHeader.vue -->
<script setup lang="ts">
/**
 * Header - Top-level header combining auth and nav.
 */
import AuthButton from '@/components/fixtures/header/AtomAuthIcon.vue'
import HeaderNav from '@/components/fixtures/header/MoleculeHeaderNav.vue'
</script>

<template>
  <!-- Header navigation area -->
  <nav class="nav">
    <!-- Login/Account button -->
    <AuthButton class="nav__auth" />

    <!-- Conditionally rendered nav links -->
    <HeaderNav class="nav__site" />
  </nav>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 0.15rem;

  @include mix-media(tablet) {
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  @include mix-media(laptop) {
    gap: 0.25rem;
    padding: 0.5rem 1rem;
  }
}
</style>
