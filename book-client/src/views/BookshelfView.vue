<!-- src/views/BookshelfView.vue -->
<script setup lang="ts">
/**
 * BookshelfView.vue
 *
 * Displays all books as cards with optional navigation.
 */
import { ref, onMounted } from 'vue'
import BookCard from '@/components/books/BookCard.vue'
import BackButton from '@/components/atoms/BackButton.vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}

export interface Book {
  _id: string
  title: string
  author: string
  genres: string[]
  image: string
  published_year: number
  averageRating: number
  reviews: Array<any>
}

const books = ref<Book[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/books`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="bookshelf">
    <BackButton @click="goBack" />
    <h1>Bookshelf</h1>

    <div v-if="loading">Loading books...</div>
    <div v-else-if="books.length === 0">Bookshelf is empty.</div>

    <div v-else class="books-grid">
      <BookCard v-for="book in books" :key="book._id" :book="book" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.back-button {
  margin-right: auto;
}

.bookshelf {
  width: 95%;

  @include mix-media(laptop) {
    max-width: 85%;
  }

  @include mix-media(desktop) {
    max-width: 90%;
  }

  @include mix-flex-center(column);

  h1 {
    text-transform: uppercase;
    text-align: center;
    font-size: fn-rem(36);
    margin-bottom: 1rem;
    border-bottom: fn-rem(2) solid var(--color-action-primary);
    padding-bottom: 1.5rem;
    width: 100%;

    @include mix-media(laptop) {
      font-size: fn-rem(48);
    }

    @include mix-media(desktop) {
      font-size: fn-rem(64);
    }
  }

  .books-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: fn-rem(600);

    @include mix-media(laptop) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-width: 100%;
    }

    @include mix-media(desktop) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
