<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTable from './BaseTable.vue'
import type { IUser } from '@/types/IUser'
const API_URL = import.meta.env.VITE_API_URL

/**
 * Reactive array of users retrieved from the backend API.
 * Each user object should match the IUser interface.
 */
const users = ref<IUser[]>([])

/**
 * Fetches all users from the backend.
 * Populates the `users` list with formatted user data.
 * Handles fetch errors by logging to the console.
 */
const fetchUsers = async () => {
  try {
    const res = await fetch(API_URL + '/users')
    const raw = await res.json()
    users.value = raw
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
}

onMounted(fetchUsers)

/**
 * Table column configuration for BaseTable.
 * Each column includes a label (for the table header)
 * and a key (used to access the user property).
 */
const columns = [
  { label: 'Username', key: 'username' },
  { label: 'Password', key: 'password', breakable: true },
  { label: 'Role', key: 'role' },
  { label: 'Created', key: 'created_at' },
]
</script>

<template>
  <div class="usertable">
    <BaseTable :columns="columns" :items="users" rowKey="id" />
  </div>
</template>

<style scoped lang="scss">
.usertable {
  min-width: fn-rem(300);
  max-width: fn-rem(650);
  margin: 0 auto;
}
</style>
