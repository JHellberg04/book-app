<script setup lang="ts">
import UsersTable from '@/components/admin/UsersTable.vue'
import LogoutUser from '@/components/auth/LogoutUser.vue'
</script>

<template>
  <section class="home">
    <LogoutUser />
  </section>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
