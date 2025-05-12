<script setup lang="ts">
import AtomList from '@/components/auth/AtomListIcon.vue'

const props = defineProps<{
  listinfo: string
}>()
</script>

<template>
  <li class="listitem">
    <AtomList class="listitem__icon" />
    <span class="list-item__text">{{ listinfo }}</span>
  </li>
</template>

<style scoped lang="scss">
.listitem {
  display: flex;
  align-items: center;
  gap: fn-rem(8); // 0.5rem = 8px

  &__text {
    font-size: fn-rem(16);

    @include mix-media(tablet) {
      font-size: fn-rem(18);
    }

    @include mix-media(laptop) {
      font-size: fn-rem(20);
    }
  }

  &__icon {
    width: fn-rem(24);
    height: fn-rem(24);

    @include mix-media(tablet) {
      width: fn-rem(26);
      height: fn-rem(26);
    }

    @include mix-media(laptop) {
      width: fn-rem(28);
      height: fn-rem(28);
    }
  }
}
</style>
