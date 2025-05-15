<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseTable from './BaseTable.vue'
const API_URL = import.meta.env.VITE_API_URL

interface Book {
  _id: string
  title: string
  author: string
  genres: string[] | string
  created_at: string
}

const books = ref<Book[]>([])

const fetchBooks = async () => {
  try {
    const res = await fetch(API_URL + '/books')
    const raw = await res.json()
    books.value = raw
  } catch (err) {
    console.error('Failed to fetch books:', err)
  }
}

onMounted(fetchBooks)

const columns = [
  { label: 'Title', key: 'title' },
  { label: 'Author', key: 'author' },
  { label: 'Genres', key: 'genres', breakable: true },
  { label: 'Created at', key: 'createdAt' },
]

// Optionally, format genres as a comma-separated string for display
const formattedBooks = computed(() =>
  books.value.map((book) => ({
    ...book,
    genres: Array.isArray(book.genres) ? book.genres.join(', ') : book.genres,
  })),
)
</script>

<template>
  <div class="booktable">
    <BaseTable :columns="columns" :items="formattedBooks" rowKey="_id" />
  </div>
</template>

<style scoped lang="scss">
.booktable {
  min-width: 300px;
  margin: 0 auto;
}
</style>
