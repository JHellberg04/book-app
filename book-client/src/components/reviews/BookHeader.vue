<template>
  <div class="book-header">
    <button @click="$router.back()">⬅</button>
    <img :src="image" alt="Book Cover" class="book-cover" />
    <p>{{ genre }}</p>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  genre: String,
})
</script>

<style scoped lang="scss">
.book-header {
  margin: 0;
}
</style>
