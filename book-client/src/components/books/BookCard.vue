<template>
  <article class="book-card">
    <img :src="book.image" :alt="'Book cover for ' + book.title" />

    <div class="book-info-container">
      <div class="book-info">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-year">{{ book.published_year }}</p>
        <p class="book-author">By {{ book.author }}</p>
        <p class="book-genres">
          <span v-for="(genre, index) in book.genres" :key="genre" class="genre">
            {{ genre }}<span v-if="index < book.genres.length - 1">, </span>
          </span>
        </p>
      </div>
      <div class="link-container">
        <router-link :to="`/bookshelf/${book._id}`" class="book-link">READ MORE</router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Book {
  _id: string
  title: string
  author: string
  published_year: number
  genres: string[]
  image: string
}

const props = defineProps<{
  book: Book
}>()
</script>

<style scoped lang="scss">
@use '@abstracts/mixins/flex-center' as *;

.book-card {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border-bottom: 1px solid var(--color-action-primary-hover);
  min-height: fn-rem(170);
  font-family: var(--font-secondary);
  padding-bottom: 1rem;

  img {
    max-width: fn-rem(103);
    max-height: fn-rem(150);
    height: auto;
    object-fit: contain;
    margin-block: auto;
  }

  .book-info-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    .book-info {
      .book-title {
        font-size: fn-rem(20);
        font-weight: bold;
      }

      .book-year,
      .book-genres {
        font-style: italic;
      }

      .book-genres {
        font-weight: 550;
      }
    }

    .link-container {
      @include mix-flex-center(column);

      .book-link {
        font-size: fn-rem(18);
        text-decoration: underline;
        text-underline-offset: fn-rem(4);
        @include mix-flex-center(column);
        width: 10ch;
        line-height: 1;
        padding-block: 1rem;
      }
    }
  }
}
</style>
