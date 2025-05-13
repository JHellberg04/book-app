<script setup>
import { ref, onMounted } from 'vue'
import { defineProps } from 'vue'
import StarRating from '@/components/reviews/StarRating.vue'


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


<template>
 <div class="review">
  <h2 class="review__title">Reviews from readers</h2>

  <div class="review__list">
    <div v-if="reviews.length === 0" class="review__empty">No reviews</div>

    <div
      v-for="review in reviews"
      :key="review._id"
      class="review__card"
    >
      <div class="review__header">
        <StarRating :rating="review.rating" />
        <small class="review__date">{{ formatDate(review.created_at) }}</small>
      </div>

      <strong class="review__name">{{ review.name }}</strong>
      <p class="review__content">{{ review.content }}</p>
    </div>
  </div>
</div>

</template>


<style scoped lang="scss">
.review {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  @include mix-media(desktop) {
    width: 80%;
  }

  &__title {
    font-size: 2rem;
    margin: 20px 0;
    text-align: center;
  }

  &__list {
    margin-top: 2rem;
  }

  &__empty {
    text-align: center;
    font-style: italic;
    padding: 2rem 0;
  }

  &__card {
    padding: 1rem 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  &__date {
    font-size: 0.8rem;
  }

  &__name {
    display: block;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  &__content {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
  }
}

</style>
