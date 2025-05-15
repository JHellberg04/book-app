<script setup lang="ts">
import BaseAction from '@/components/atoms/BaseAction.vue'

const props = defineProps<{
  heading?: string
  to: string
  label: string
}>()
</script>

<template>
  <div class="account-cta">
    <h2 class="account-cta__heading" v-if="heading">{{ heading }}</h2>
    <BaseAction
      class="account-cta__button"
      as="router-link"
      :to="to"
      :label="label"
      variant="secondary"
    />
  </div>
</template>

<style scoped lang="scss">
.account-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: fn-rem(40);
  margin-bottom: fn-rem(40);

  &__heading {
    font-size: fn-rem(20);
    text-align: center;
  }

  &__button {
    max-width: fn-rem(250);
    width: 100%;
  }
}
</style>
