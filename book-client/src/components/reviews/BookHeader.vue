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
  width: auto;
  max-width: fn-rem(350);
  height: auto;
  max-height: fn-rem(350);
  object-fit: contain;

  }
}
</style>
