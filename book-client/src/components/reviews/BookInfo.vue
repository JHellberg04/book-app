<script setup lang="ts">
const { title, author, published_year, rating, description } = defineProps<{
  title: string
  author: string
  published_year: number
  rating: number
  description: string
}>()
</script>

<template>
  <div class="info">
    <h1 class="info__title">{{ title }}</h1>
    <p class="info__author-published">
      <span>Author: {{ author }}</span>
      <span>Published: {{ published_year }}</span>
    </p>
    <div class="info__rating">
      <template v-for="i in 5" :key="i">
        <span
          class="info__rating-star"
          :class="{
            filled: i <= Math.floor(rating),
            half: i > Math.floor(rating) && i - 0.5 <= rating,
          }"
          >★</span
        >
      </template>
    </div>
    <p class="info__description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.info {
  width: 100%;
  margin: 0;
  text-align: center;
  padding: 1rem;

  @include mix-media(tablet) {
    width: 50%;
    padding: 0 2rem;
    text-align: left;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;

    @include mix-media(tablet) {
      font-size: 1.8rem;
    }

    @include mix-media(laptop) {
      font-size: 2.2rem;
    }
  }

  &__author-published {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: var(--color-black);
    span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  &__rating {
    font-size: 1.2rem;
    margin-bottom: 1rem;

    &-star {
      color: var(--color-ratingstar-empty);
      cursor: pointer;
      transition: color 0.3s ease;

      &.filled {
        color: var(--color-ratingstar-filled);
      }
    }
    @include mix-media(tablet) {
      font-size: 1.4rem;
    }

    @include mix-media(laptop) {
      font-size: 1.6rem;
    }
  }

  &__description {
    font-size: 1rem;
    line-height: 1.5;
    text-align: justify;
    max-width: 90%;
    margin: 0 auto;

    @include mix-media(tablet) {
      max-width: none;
      margin: 0;
      font-size: 1.1rem;
    }

    @include mix-media(laptop) {
      font-size: 1.2rem;
    }
  }
}

.filled {
  color: var(--color-ratingstar-filled);
}

.empty {
  color: var(--color-ratingstar-empty);
}
</style>
