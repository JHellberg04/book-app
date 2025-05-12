<script setup lang="ts">
import iconSrc from '@/assets/icon/listicon-32x32px.png'
</script>

<template>
  <span class="listicon">
    <img
      :src="iconSrc"
      alt=""
      aria-hidden="true"
      loading="lazy"
      width="32"
      height="32"
      class="listicon__img"
    />
  </span>
</template>

<style scoped lang="scss">
.listicon {
  @include mix-flex-center();
  max-width: 2rem;
  max-height: 2rem;

  &__img {
    height: 100%;
    width: 100%;
  }
}
</style>
