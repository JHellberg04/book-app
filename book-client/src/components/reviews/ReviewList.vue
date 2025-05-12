<template>
  <div class="review-column">
    <h2 class="section-title">Reviews from readers</h2>

    <div class="review-list">
      <div v-if="reviews.length === 0">No reviews</div>

      <div v-for="review in reviews" :key="review._id" class="review-card">
        <div class="review-header">
          <div class="star-display">
            <span v-for="n in 5" :key="n" :class="{ star: true, filled: n <= review.rating }"
              >★</span
            >
          </div>
          <small class="review-date">{{ formatDate(review.created_at) }}</small>
        </div>

        <strong class="review-name">{{ review.name }}</strong>
        <p class="review-content">{{ review.content }}</p>
      </div>
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
h2.section-title {
  font-size: 2rem;
  margin: 20px 0;
  text-align: center;
}
.review-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.review-list {
  margin-top: 2rem;
}

.review-card {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.8rem;
  color: #888;
}

.star-display {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 1.2rem;
  color: #ccc;
}

.star.filled {
  color: gold;
}

.review-name {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.review-content {
  margin: 0;
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
}
</style>
