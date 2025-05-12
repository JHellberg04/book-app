<template>
  <div class="review-list">
    <h2>Reviews from readers</h2>
    <div v-if="reviews.length === 0">No reviews</div>
    <div v-for="review in reviews" :key="review._id" class="review-card">
      <strong>{{ review.name }}</strong> - {{ review.rating }} ★
      <p>{{ review.content }}</p>
      <small>{{ formatDate(review.created_at) }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  bookId: String,
})

const reviews = ref([])

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/reviews/book/${props.bookId}`)
  reviews.value = await res.json()
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE')
}
</script>

<style scoped lang="scss">
.review-list {
  margin-top: 2rem;
}

.review-card {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}
</style>
