<script setup lang="ts">
/**
 * App.vue
 * Root component of the application.
 * - Renders the global Header
 * - Wraps routed views in <main>
 * - Placeholder <footer> (can be replaced with global component)
 */
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/fixtures/header/HeaderComponent.vue'
</script>

<template>
  <!-- Global site header -->
  <HeaderComponent />

  <!-- Routed content -->
  <main class="main">
    <RouterView />
  </main>

  <!-- Global footer (optional) -->
  <footer class="footer">
    <!-- If footer is used, mount globally via index.ts -->
  </footer>
</template>

<style lang="scss">
html {
  background-color: var(--color-background);
  color: var(--color-text-dark);
  font-family: var(--font-primary);
}

.main {
  width: 100%;
  height: 100%;
  max-width: fn-rem(1440);
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  @include mix-flex-center(column);
}

.footer {
  position: fixed;
  bottom: 0;
}

</style>
