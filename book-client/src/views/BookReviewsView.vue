<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Import components
import BookHeader from '@/components/reviews/BookHeader.vue'
import BookInfo from '@/components/reviews/BookInfo.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import ReviewList from '@/components/reviews/ReviewList.vue'
import BackButton from '@/components/atoms/BackButton.vue'

// Get the route parameters
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

const loading = ref(true)

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

<template>
  <div class="review-page">
    <div v-if="loading">Laddar...</div>

    <div class="review-page__header">
      <BackButton @click="$router.push('/bookshelf')" />
      <p class="review-page__genre">{{ book.genres?.join(', ') || 'Genre not available' }}</p>
    </div>

    <div v-if="book.title" class="review-page__book">
      <BookHeader :image="book.image" :title="book.title" :genres="book.genres" />
      <BookInfo
        :title="book.title"
        :author="book.author"
        :published_year="book.published_year"
        :rating="book.averageRating ?? 0"
        :description="book.description"
      />
    </div>

    <div v-if="book._id" class="review-page__review">
      <ReviewForm :bookId="book._id" />
      <ReviewList :bookId="book._id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.review-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__genre {
    font-weight: 500;
    margin: auto 0;
  }

  &__book {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include mix-media(laptop) {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 3rem;
      align-items: start;

      > :first-child {
        grid-column: 1 / span 3;
      }

      > :nth-child(2) {
        grid-column: 4 / span 4;
      }
    }
  }

  &__review {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include mix-media(desktop) {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      gap: 3rem;
      align-items: start;

      > :first-child {
        grid-column: 2 / span 4;
      }

      > :nth-child(2) {
        grid-column: 7 / span 6;
      }
    }

    @include mix-media(laptop) {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 3rem;
      align-items: start;

      > :first-child {
        grid-column: 1 / span 3;
      }

      > :nth-child(2) {
        grid-column: 4 / span 4;
      }
    }
  }
}
</style>
