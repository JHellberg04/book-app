<template>
  <div class="review-page">
    <div v-if="loading">Laddar...</div>

    <div class="header-bar">
      <button @click="$router.back()" class="back-button">⬅ Back</button>
      <p class="genre">{{ book.genres?.join(', ') || 'Genre not available' }}</p>
    </div>

    <div v-if="book.title" class="book-layout">
      <BookHeader :image="book.image" :title="book.title" :genres="book.genres" />
      <BookInfo
        :title="book.title"
        :author="book.author"
        :published_year="book.published_year"
        :rating="book.averageRating ?? 0"
        :description="book.description"
      />
    </div>

    <div class="review-layout" v-if="book._id">
      <ReviewForm :bookId="book._id" />
      <ReviewList :bookId="book._id" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Import components
import BookHeader from '@/components/reviews/BookHeader.vue'
import BookInfo from '@/components/reviews/BookInfo.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import ReviewList from '@/components/reviews/ReviewList.vue'

// Get the route parameters
const route = useRoute()
const bookId = route.params.id
// Define the book object
const book = ref({
  _id: '',
  title: '',
  author: '',
  genre: '',
  image: '',
  description: '',
  rating: 0,
})

const loading = ref(true)

// Fetch the book data from the API
// using the bookId from the route parameters
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/books/${bookId}`)
    if (!res.ok) throw new Error('Boken kunde inte hämtas')
    book.value = await res.json()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
.review-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.back-button {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000;
}

.genre {
  font-size: 18px;
  color: #000;
}

.book-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;

    > * {
      flex: 1;
      min-width: 0;
    }
  }
}

.review-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;

    > * {
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
