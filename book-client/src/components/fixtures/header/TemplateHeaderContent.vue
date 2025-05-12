<script setup lang="ts">
/**
 * TemplateHeaderContent
 * Layout wrapper that combines the logo and main navigation for the header.
 */

import HeaderLogo from '@/components/fixtures/header/AtomHeaderLogo.vue'
import HeaderNav from '@/components/fixtures/header/OrganismHeaderNav.vue'
</script>

<template>
  <!-- Header content layout -->
  <div class="header-content">
    <HeaderLogo />
    <HeaderNav />
  </div>
</template>

<style scoped lang="scss">
.header-content {
  width: 100%;
  padding: 0.25rem 0.5rem;
  padding-left: 0;
  min-height: fn-rem(72);
  max-width: fn-rem(1440);
  position: relative;

  @include mix-media(tablet) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
