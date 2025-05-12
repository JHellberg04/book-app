<script setup lang="ts">
/**
 * AtomHeaderLogo
 * Displays the small site logo with a router link to the homepage.
 */
import lightLogo from '@/assets/logotype/logotype-small-dark.svg'
</script>

<template>
  <!-- Clickable logo that routes to the homepage -->
  <div class="logo">
    <RouterLink class="logo__link" to="/" aria-label="Gå till startsidan">
      <img :src="lightLogo" alt="Peach pages text with an open book" class="logo__link-img" />
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: fn-rem(48);
  max-width: fn-rem(190);
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;

  @include mix-media(tablet) {
    width: 100%;
    height: 100%;
    min-height: fn-rem(48);
    position: static;
    min-width: fn-rem(190);
    max-width: fn-rem(400);
    @include mix-flex-center();
    padding: 0.25rem 0.5rem;
  }

  @include mix-media(laptop) {
    padding: 0.5rem 1rem;
  }

  &__link {
    width: 100%;
    height: 100%;
    aspect-ratio: 13 / 4;
    border-radius: 0.25rem;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:focus-visible {
      outline: 1px solid var(--color-logo);
      outline-offset: fn-rem(3);
      transform: scale(1.05);
      animation: shrink 120ms ease-in-out;
    }
  }
  &__link-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
