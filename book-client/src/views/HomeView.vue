<script setup lang="ts">
import BaseAction from '@/components/atoms/BaseAction.vue'
</script>

<template>
  <h1>Home View</h1>
  <div class="actiontest">
    <section style="display: flex; flex-direction: column; gap: 1rem">
      <BaseAction label="Save" variant="primary" type="submit" />
      <BaseAction label="Cancel" variant="secondary" type="button" />
      <BaseAction label="Learn More" variant="primary" as="a" href="https://example.com" />
      <BaseAction label="Back to Home" variant="secondary" as="a" href="/" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.actiontest {
  width: 300px;
}
</style>
