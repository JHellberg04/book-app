<template>
  <button @click="$emit('click')" class="back-button">⬅ Back</button>
</template>

<script setup lang="ts">
// No props needed for now, but you can emit a custom event
</script>

<style scoped lang="scss">
.back-button {
  margin-top: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding-inline: fn-rem(15);
  line-height: fn-rem(40);
  height: fn-rem(40);

  transition:
    font-size 0.2s ease,
    background-color 0.2s ease,
    border-radius 0.2s ease;

  &:hover {
    border-radius: 0.5rem;
    font-size: 1.55rem;
    background-color: var(--color-action-primary-hover);
  }

  @include mix-media(laptop) {
    font-size: 2rem;

    &:hover {
      font-size: 2.05rem;
    }
  }
}
</style>
