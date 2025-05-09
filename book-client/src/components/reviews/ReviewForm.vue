<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  bookId: string
}>()

const name = ref('')
const content = ref('')
const rating = ref('')
const router = useRouter()

const submitReview = async () => {
  const review = {
    name: name.value,
    content: content.value,
    rating: Number(rating.value),
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
    rating.value = ''


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
    <label>Your rating:</label>
    <select v-model="rating" required>
      <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
    </select>
    <button type="submit">Send</button>
  </form>
</template>

<style scoped lang="scss">
.review-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
