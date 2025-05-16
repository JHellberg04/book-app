<!--//components/fixtures/header/headerComponent-->

<script setup lang="ts">
/**
 * AppHeader
 * Root header component – wraps the full header content layout.
 * - Uses TemplateHeaderContent to compose the full header area
 */
import HeaderContent from './TemplateHeaderContent.vue'
</script>

<template>
  <!-- Sticky site header -->
  <header class="header">
    <HeaderContent />
  </header>
</template>

<style scoped lang="scss">
.header {
  @include mix-flex-center();
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--color-header-bg);
  color: var(--color-header-text);
}
</style>
