<template>
  <div class="book-header">
    <button @click="$router.back()">⬅</button>
    <img :src="image" alt="Book Cover" class="book-cover" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string
}>()
</script>

<style scoped lang="scss">
.book-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-cover {
  width: 100%;
  max-width: 600px;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  border-radius: 8px;
}
</style>
