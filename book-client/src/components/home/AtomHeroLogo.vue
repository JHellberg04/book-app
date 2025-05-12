<script setup lang="ts">
import HeroLogo from '@/assets/logotype/logotype-large-dark.svg'
</script>

<template>
  <picture class="herologo">
    <img
      class="herologo__img"
      :src="HeroLogo"
      alt="Peach Pages logo with slogan 'review the book, not just the story'"
      width="600"
      height="600"
      loading="lazy"
    />
  </picture>
</template>

<style scoped lang="scss">
.herologo {
  width: 100%;
  min-width: fn-rem(250);
  width: fn-rem(300);
  max-width: fn-rem(350);

  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
