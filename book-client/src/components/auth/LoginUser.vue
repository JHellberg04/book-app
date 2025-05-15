<script setup lang="ts">
import { ref } from 'vue'

const authFormRef = ref()

import AuthForm from '@/components/auth/AuthForm.vue'
import LoginButton from '@/components/auth/LoginButton.vue'
import RegisterCTA from '@/components/organism/ButtonCta.vue'
import DevtoolsPanel from '@/devtools/DevtoolsPanel.vue'
</script>

<template>
  <section class="login">
    <h1 class="login__title">Log in to your account</h1>
    <p class="login__subtitle">Log in to explore your bookshelf and leave reviews.</p>

    <div class="login__form">
      <AuthForm ref="authFormRef">
        <template #authaction>
          <LoginButton class="login__button" :formRef="authFormRef" />
        </template>
      </AuthForm>
    </div>

    <RegisterCTA
      class="login__cta"
      heading="Don’t have an account?"
      to="/account/register"
      label="Register"
      message1="Start exploring your favorite books"
      message2="and share your thoughts with other members"
    />
  </section>
  <section>
    <h1>Log In</h1>
    <DevtoolsPanel />
  </section>
</template>

<style scoped lang="scss">
.login {
  margin: auto;
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-width: fn-rem(450);
  @include mix-flex-center(column, 1.5rem);

  &__title {
    font-size: fn-rem(24);
    font-weight: bold;
    text-align: center;
  }

  &__subtitle {
    font-size: fn-rem(16);
    text-align: center;
  }

  &__form {
    width: 85%;
  }

  &__button {
    margin-top: 1rem;
  }

  &__cta {
    margin-top: 2rem;
  }
}
</style>
