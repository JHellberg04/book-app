<template>
  <div class="review-page">

    <div v-if="loading">Laddar...</div>

    <BookHeader v-if="book.title" :image="book.image" :title="book.title" :genre="book.genre" />
    <BookInfo v-if="book.title" :title="book.title" :author="book.author" :rating="book.rating" :description="book.description" />
    <ReviewForm v-if="book._id" :bookId="book._id" />
    <ReviewList v-if="book._id" :bookId="book._id" />
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
  margin: 0;
}
</style>
