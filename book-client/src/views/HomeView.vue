<script setup lang="ts">
import { ref } from 'vue'
import BaseAction from '@/components/atoms/BaseAction.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'

// === Form fields ===
const text = ref('')
const email = ref('')
const password = ref('')
const number = ref('')
const tel = ref('')
const url = ref('')
const search = ref('')
const date = ref('')

// === Validation functions ===
const validateText = (val: string) => (val.length < 2 ? 'Must be at least 2 characters' : null)

const validateEmail = (val: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Enter a valid email' : null

const validatePassword = (val: string) =>
  val.length < 8 ? 'Password must be at least 8 characters' : null

const validateNumber = (val: string) => (isNaN(Number(val)) ? 'Must be a valid number' : null)

const validateTel = (val: string) =>
  !/^\+?[0-9\s\-]{6,}$/.test(val) ? 'Enter a valid phone number' : null

const validateUrl = (val: string) =>
  val && !/^https?:\/\/.+\..+/.test(val) ? 'Enter a valid URL' : null

const validateSearch = (val: string) => (val.length < 1 ? 'Search cannot be empty' : null)

const validateDate = (val: string) => (val === '' ? 'Please select a date' : null)
</script>

<template>
  <h1>Home View</h1>

  <section class="test">
    <form class="input-wrapper" @submit.prevent>
      <BaseInput
        id="text"
        name="Text"
        v-model="text"
        placeholder="Enter text"
        info="Min 2 characters."
        :validate="validateText"
      />
      <BaseInput
        id="email"
        name="Email"
        v-model="email"
        placeholder="Enter email"
        autocomplete="email"
        info="Example: name@example.com"
        :validate="validateEmail"
      />
      <BaseInput
        id="password"
        name="Password"
        v-model="password"
        type="password"
        placeholder="Enter password"
        info="At least 8 characters"
        :validate="validatePassword"
      />
      <BaseInput
        id="number"
        name="Number"
        v-model="number"
        type="number"
        placeholder="Enter number"
        info="Digits only"
        :validate="validateNumber"
      />
      <BaseInput
        id="tel"
        name="Phone"
        v-model="tel"
        type="tel"
        placeholder="Enter phone number"
        info="Example: +46701234567"
        :validate="validateTel"
      />
      <BaseInput
        id="url"
        name="Website"
        v-model="url"
        type="url"
        placeholder="Enter URL"
        info="Start with http:// or https://"
        :validate="validateUrl"
      />
      <BaseInput
        id="search"
        name="Search"
        v-model="search"
        type="search"
        placeholder="Search..."
        :validate="validateSearch"
      />
      <BaseInput
        id="date"
        name="Date"
        v-model="date"
        type="date"
        info="Choose a date"
        :validate="validateDate"
      />
    </form>

    <div class="action-wrapper">
      <BaseAction label="Save" variant="primary" type="submit" />
      <BaseAction label="Cancel" variant="secondary" type="button" />
      <BaseAction label="Learn More" variant="primary" as="a" href="https://example.com" />
      <BaseAction label="Back to Home" variant="secondary" as="a" href="/" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.test {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

.action-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
}
</style>
