<script setup lang="ts">
defineProps<{
  title: string
  author: string
  published: string
  rating: number
  description: string
}>()
</script>

<template>
  <div class="book-info">
    <h1>{{ title }}</h1>
    <p>Author: {{ author }}</p>
    <p>Published: {{ published }}</p>
    <p>Rating: {{ rating }}/5</p>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.book-info {
  margin: 0;
}
</style>
