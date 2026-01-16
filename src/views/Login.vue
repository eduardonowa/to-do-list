<template>
  <div
    class="min-h-screen bg-bg-default md:bg-bg-light flex items-center justify-center p-4 md:p-4"
  >
    <div
      class="bg-bg-default rounded-none md:rounded-lg shadow-none md:shadow-lg p-4 md:p-8 w-full max-w-md md:max-w-md"
    >
      <div class="flex justify-center">
        <img src="@/assets/icons/bext-logo.svg" alt="Logo" class="w-[90px] h-[40px]" />
      </div>
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
        <p class="text-text-secondary">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <Input
          v-model="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          :error="emailError"
          required
        />

        <Input
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :error="passwordError"
          required
        />

        <Button
          type="submit"
          variant="primary"
          :disabled="authStore.isLoading || !isFormValid"
          full-width
          class="w-full"
          @click.prevent="handleLogin"
        >
          {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-text-secondary">
        <p>Demo credentials:</p>
        <p class="mt-2 font-mono text-xs">
          Email: user@example.com<br />
          Password: password123
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Button, Input } from '@/components/common';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = computed(() => {
  return email.value.length > 0 && emailRegex.test(email.value);
});

const isFormValid = computed(() => {
  return isValidEmail.value && password.value.length > 0;
});

const validateForm = () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
    return false;
  }

  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email';
    return false;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    return false;
  }

  return true;
};

const handleLogin = async (event?: globalThis.Event) => {
  if (event) {
    event.preventDefault();
  }

  if (!validateForm()) {
    return;
  }

  const result = await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/');
  } else {
    // Set error on both fields to show error border, but only show message on password field
    emailError.value = ' '; // Space to trigger error state (border) without showing message
    passwordError.value = result.error || 'Invalid credentials';
  }
};
</script>
