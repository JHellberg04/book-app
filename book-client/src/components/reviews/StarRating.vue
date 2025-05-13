<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  rating: number
  interactive?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:rating', value: number): void
}>()

const hoverRating = ref(0)

const setHover = (value: number) => {
  if (props.interactive) hoverRating.value = value
}

const clearHover = () => {
  if (props.interactive) hoverRating.value = 0
}

const setRating = (value: number) => {
  if (props.interactive) emit('update:rating', value)
}
</script>

<template>
  <div class="star-rating">
    <span
      v-for="n in 5"
      :key="n"
      class="star-rating__star"
      :class="{
        filled: n <= Math.floor(hoverRating || rating),
        half: n > Math.floor(hoverRating || rating) && n - 0.5 <= (hoverRating || rating),
      }"
      @click="setRating(n)"
      @mouseover="setHover(n)"
      @mouseleave="clearHover"
    >
      ★
    </span>
  </div>
</template>

<style scoped lang="scss">
.star-rating {
  display: flex;
  gap: 5px;
  font-size: 1.5rem;
  justify-content: center;
  cursor: default;

  &__star {
    color: var(--color-ratingstar-empty);
    transition: color 0.2s;
    cursor: inherit;

    &.filled {
      color: var(--color-ratingstar-filled);
    }

    &:hover {
      filter: brightness(1.2);
    }
  }

  // If interactive mode, enable pointer cursor
  :deep(.star-rating__star) {
    cursor: pointer;
  }
}
</style>
