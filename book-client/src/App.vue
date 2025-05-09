<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- When header is used mount app.component in index.ts for global component -->
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <!-- If footer is used mount app.component in index.ts for global component -->
  </footer>
</template>

<style lang="scss">
html {
  background-color: var(--color-background);
  color: var(--color-text-dark);
  font-family: var(--font-primary);
}
</style>
