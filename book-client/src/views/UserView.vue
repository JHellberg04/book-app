<script setup lang="ts"></script>

<template>
  <section class="userview">
    <h1>User account</h1>
    <h2>Welcome back!</h2>
    <p>This page is under construction</p>
  </section>
</template>

<style scoped lang="scss">
.userview {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  padding: 2rem;

  h1 {
    @include mix-visually-hidden();
  }

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
