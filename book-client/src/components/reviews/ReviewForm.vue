<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseAction from '@/components/atoms/BaseAction.vue'
import StarRating from '@/components/reviews/StarRating.vue'


const props = defineProps<{
  bookId: string
}>()

const name = ref('')
const content = ref('')
const router = useRouter()
const rating = ref(0)
const hoverRating = ref(0)

const setRating = (n: number) => {
  rating.value = n
}

const setHover = (n: number) => {
  hoverRating.value = n
}

const clearHover = () => {
  hoverRating.value = 0
}

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
<div class="review-form">
  <h2 class="review-form__title">Reviews & rating</h2>

  <form @submit.prevent="submitReview" class="review-form__form">
    <BaseInput
      id="name"
      name="Name"
      v-model="name"
      placeholder="Your name"
      info="Enter your name"
      :center-label="true"
      :validate="(val) => (val.length < 2 ? 'Name too short' : null)"
    />

    <BaseInput
      id="content"
      name="Review"
      v-model="content"
      type="textarea"
      placeholder="Write your review"
      info="At least 2 characters"
      :center-label="true"
      :validate="(val) => (val.length < 2 ? 'Review too short' : null)"
    />

    <div class="review-form__label">Your rating:</div>
    <div class="review-form__stars">
      <StarRating v-model:rating="rating" :interactive="true" />

    </div>

    <BaseAction label="Send" variant="primary" type="submit" />
  </form>
</div>

</template>

<style scoped lang="scss">
.review-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  &__title {
    font-size: 2rem;
    margin: 20px 0 80px 0;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    align-items: center;

    @include mix-media(desktop) {
      max-width: 100%;
      padding-right: 2rem;
    }

    .inputfield {
      width: 100%;
      max-width: 400px;
    }

    .inputfield__field {
      max-width: 100%;
    }

    button,
    .base-action {
      max-width: 200px;
      width: 100%;
      align-self: center;
    }
  }

}

</style>
