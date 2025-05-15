<script setup lang="ts">
import HomeCTA from '@/components/organism/ButtonCta.vue'
import AtomHeroLogo from '@/components/home/AtomHeroLogo.vue'
import OragnismHomeInfo from '@/components/home/OragnismHomeInfo.vue'
</script>

<template>
  <section class="home">
    <h1 class="home__title">Welcome to Peach Pages</h1>
    <AtomHeroLogo />
    <OragnismHomeInfo />
    <HomeCTA
      heading="Ready to start building your shelf?"
      to="/account/register"
      label="Create Account"
    />
  </section>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  @include mix-flex-center(column);

  &__title {
    @include mix-visually-hidden();
  }
}
</style>
