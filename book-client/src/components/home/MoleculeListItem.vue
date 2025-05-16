<!-- components/home/MoleculeListItem.vue -->
<script setup lang="ts">
/**
 * ListItem - Displays a single item in a list.
 */
import AtomList from '@/components/home/AtomListIcon.vue'

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
  align-items: start;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  @include mix-media(mobile) {
    margin-bottom: 0.5rem;
  }

  @include mix-media(tablet) {
    margin-bottom: 0.75rem;
  }

  &__text {
    font-size: fn-rem(15);

    @include mix-media(mobile) {
      font-size: fn-rem(16);
    }

    @include mix-media(tablet) {
      font-size: fn-rem(17);
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
