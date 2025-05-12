<script setup lang="ts">
import ListItem from '@/components/home/MoleculeListItem.vue'

const listData = [
  'Build your virtual bookshelf',
  'Leave honest reviews',
  'Discover hidden gems',
  'Join a growing reader community',
]
</script>

<template>
  <article class="homeinfo">
    <h2 class="homeinfo__title">About Peach Pages</h2>

    <p class="homeinfo__text">
      Explore bookshelves, rate stories, and discover new reads through a cozy review community.
    </p>
    <ul class="homeinfo__list">
      <ListItem v-for="(item, index) in listData" :key="index" :listinfo="item" />
    </ul>
  </article>
</template>

<style scoped lang="scss">
.homeinfo {
  @include mix-flex-center(column);
  gap: 1rem;
  max-width: fn-rem(320);
  padding: 0.5rem;

  @include mix-media(mobile) {
    max-width: fn-rem(450);
    padding: 1rem;
  }

  @include mix-media(tablet) {
    max-width: fn-rem(500);
    padding: 1.5rem;
  }

  &__title {
    @include mix-visually-hidden();
  }

  &__text {
    font-size: fn-rem(17);
    padding-bottom: 0.5rem;

    @include mix-media(mobile) {
      font-size: fn-rem(18);
    }

    @include mix-media(tablet) {
      font-size: fn-rem(19);
    }

    @include mix-media(laptop) {
      font-size: fn-rem(19);
    }

    @include mix-media(desktop) {
      font-size: fn-rem(19);
    }
  }

  &__list {
    align-self: center;
    max-width: 85%;
  }
}
</style>
