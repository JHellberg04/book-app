<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  bookId: string
}>()

const name = ref('')
const content = ref('')
const rating = ref<number>(0)
const router = useRouter()

const submitReview = async () => {
  const review = {
    name: name.value,
    content: content.value,
    rating: rating.value,
    book: props.bookId,
  }

  try {
    await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })

    name.value = ''
    content.value = ''
    rating.value = 0

    router.go(0)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <form @submit.prevent="submitReview" class="review-form">
    <input v-model="name" type="text" placeholder="Your name" required />
    <textarea v-model="content" placeholder="Your review" required></textarea>
    <div>Your rating:</div>

    <!-- Rating display (moved to bottom) -->
    <div class="rating-display">
      <span
        v-for="n in 5"
        :key="n"
        :class="{'filled': n <= rating}"
        class="star"
        @click="rating = n"
      >★</span>
    </div>

    <button type="submit">Send</button>
  </form>
</template>

<style scoped lang="scss">
.review-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-display {
  display: flex;
  gap: 5px;
  font-size: 24px;
  margin-bottom: 10px;
  cursor: pointer;
}

.star {
  color: #ccc;
}

.star.filled {
  color: gold;
}
</style>
