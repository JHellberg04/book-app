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
  <div class="book-info">
    <h1>{{ title }}</h1>
    <p class="author-published">
      <span>Author: {{ author }}</span>
      <span>First Published: {{ published_year }}</span>
    </p>
    <div class="rating">
  <template v-for="i in 5" :key="i">
    <span
      class="star"
      :class="{
        filled: i <= Math.floor(rating),
        half: i > Math.floor(rating) && i - 0.5 <= rating
      }"
    >★</span>
  </template>
</div>
    <p class="description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.book-info {
  margin: 0;
  text-align: center; /* Center everything */
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.author-published {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;

  span {
    display: block;
    margin-bottom: 0.5rem;
  }
}

.rating {
  font-size: 1.5rem;
  margin-bottom: 1rem;

  .star {
    color: #ccc; /* grå som standard */
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .star.filled {
    color: #ffd700; /* guld för fyllda */
  }
}

.description {
  max-width: 90%;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

@media (max-width: 480px) { /* Mobile */
  h1 {
    font-size: 1.5rem;
  }

  .rating {
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) { /* Tablet */
  h1 {
    font-size: 1.8rem;
  }

  .rating {
    font-size: 1.4rem;
  }

  .description {
    font-size: 1rem;
  }
}

@media (max-width: 1024px) { /* Laptop */
  h1 {
    font-size: 2rem;
  }

  .rating {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1.1rem;
  }
}

@media (max-width: 1200px) { /* Desktop */
  h1 {
    font-size: 2.2rem;
  }

  .rating {
    font-size: 1.6rem;
  }

  .description {
    font-size: 1.2rem;
  }
}
</style>
