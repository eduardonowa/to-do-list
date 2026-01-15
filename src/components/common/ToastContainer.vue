<template>
  <div
    class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
    aria-live="polite"
    aria-atomic="true"
  >
    <div v-for="toast in toastStore.toasts" :key="toast.id" class="pointer-events-auto">
      <Toast :toast="toast" @close="handleClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast';
import Toast from './Toast.vue';

const toastStore = useToastStore();

const handleClose = (id: string) => {
  toastStore.removeToast(id);
};
</script>
