<template>
  <div class="review-page">
    <!-- Visa laddningsindikator tills bokdata är hämtad -->
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

// 👇 Importera komponenterna
import BookHeader from '@/components/reviews/BookHeader.vue'
import BookInfo from '@/components/reviews/BookInfo.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import ReviewList from '@/components/reviews/ReviewList.vue'

// Hämta bok-ID från ruttens parameter
const route = useRoute()
const bookId = route.params.id

const book = ref({
  _id: '',
  title: '',
  author: '',
  genre: '',
  image: '',
  description: '',
  rating: 0,
})

const loading = ref(true)  // För att visa en laddningsindikator

// 👇 Hämta bokdata från din backend
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/books/${bookId}`)
    if (!res.ok) throw new Error('Boken kunde inte hämtas')
    book.value = await res.json()
  } catch (error) {
    console.error('Error:', error)
    // Här kan du lägga till logik för att visa felmeddelande till användaren
  } finally {
    loading.value = false  // Sluta visa laddningsindikator när datan är klar
  }
})
</script>

<style scoped lang="scss">
.review-page {
  margin: 0;
}
</style>
