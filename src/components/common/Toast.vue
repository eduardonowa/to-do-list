<template>
  <div
    :id="`toast-${toast.id}`"
    :class="variantClasses"
    class="transition-all duration-300 ease-in-out opacity-0 translate-x-full"
  >
    <div :class="iconClasses" class="flex-shrink-0">
      <svg
        v-if="toast.variant === 'success'"
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg
        v-else-if="toast.variant === 'error'"
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <svg
        v-else-if="toast.variant === 'warning'"
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="flex-1">
      <p class="text-sm font-medium">{{ toast.message }}</p>
    </div>
    <button
      @click="handleClose"
      class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
      aria-label="Close toast"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { IToast } from '@/stores/toast/state';

interface IToastProps {
  toast: IToast;
}

const props = defineProps<IToastProps>();

const emit = defineEmits<{
  close: [id: string];
}>();

const variantClasses = computed(() => {
  const baseClasses =
    'flex items-center gap-3 p-4 rounded-lg shadow-lg border-l-4 min-w-[300px] max-w-md';

  switch (props.toast.variant) {
    case 'success':
      return `${baseClasses} bg-bg-light border-primary text-text-primary`;
    case 'error':
      return `${baseClasses} bg-bg-light border-warren-terracota text-text-primary`;
    case 'warning':
      return `${baseClasses} bg-bg-light border-warren-gold text-text-primary`;
    case 'info':
    default:
      return `${baseClasses} bg-bg-light border-primary text-text-primary`;
  }
});

const iconClasses = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return 'text-primary';
    case 'error':
      return 'text-warren-terracota';
    case 'warning':
      return 'text-warren-gold';
    case 'info':
    default:
      return 'text-primary';
  }
});

const handleClose = () => {
  emit('close', props.toast.id);
};

onMounted(() => {
  // Add animation on mount
  const element = document.getElementById(`toast-${props.toast.id}`);
  if (element) {
    requestAnimationFrame(() => {
      element.classList.add('animate-slide-in');
    });
  }
});
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}
</style>
