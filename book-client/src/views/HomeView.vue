<script setup lang="ts">
import LandingCTA from '@/components/auth/AtomButtonCta.vue'
import AtomHeroLogo from '@/components/auth/AtomHeroLogo.vue'
import OragnismHomeInfo from '@/components/auth/OragnismHomeInfo.vue'
</script>

<template>
  <section class="home">
    <h1 class="home__title">Welcome to Peach Pages</h1>
    <AtomHeroLogo />
    <OragnismHomeInfo />
    <LandingCTA
      class="home__cta"
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
    @include mix-flex-center();
  }
}
</style>
