<script setup lang="ts">
const props = defineProps<{
  image: string
}>()
</script>

<template>
  <div class="bookheader">
    <img :src="image" alt="Book Cover" class="bookheader__cover" />
  </div>
</template>

<style scoped lang="scss">
.bookheader {
  @include mix-flex-center();

  &__cover {
    width: 100%;
    max-width: fn-rem(600);
    height: auto;
    max-height: fn-rem(600);
    object-fit: contain;
    border-radius: fn-rem(8);
  }
}
</style>
