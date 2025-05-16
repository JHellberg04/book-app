<script setup lang="ts">
import AddNewBook from '@/components/admin/AddNewBook.vue'
import BooksTable from '@/components/admin/BooksTable.vue'
import UsersTable from '@/components/admin/UsersTable.vue'
</script>

<template>
  <section class="adminview">
    <div>
      <h1>User account</h1>
      <h2>Welcome back!</h2>
      <p>This page is under construction</p>
    </div>

    <UsersTable />
    <BooksTable />
    <AddNewBook />
  </section>
</template>

<style scoped lang="scss">
.adminview {
  width: 100%;
  min-height: 100dvh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: #e6d9ce;

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
