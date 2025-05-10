<template>
  <article class="book-card">
    <img :src="book.image" :alt="'Book cover for ' + book.title"/>

    <div class="book-info">
      <h2 class="book-title">{{ book.title }}</h2>
      <p class="book-author">By {{ book.author }}</p>
      <p class="book-year">{{ book.published_year }}</p>
      <p class="book-genres">
        <span v-for="genre in book.genres" :key="genre" class="genre">{{ genre }}</span>
      </p>
      <router-link :to="`/bookshelf/${book._id}`" class="book-link">Read more</router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Book {
  _id: string;
  title: string;
  author: string;
  published_year: number;
  genres: string[];
  image: string;
}

const props = defineProps<{
  book: Book;
}>();
</script>
