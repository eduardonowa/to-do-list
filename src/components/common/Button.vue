<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'w-full': fullWidth,
        // Variants
        'bg-primary text-text-light hover:bg-primary-light focus:ring-primary':
          variant === 'primary' && !disabled,
        'bg-bg-dark text-text-light hover:bg-bg-dark2 focus:ring-bg-dark':
          variant === 'secondary' && !disabled,
        'bg-warren-terracota text-text-light hover:bg-red-700 focus:ring-warren-terracota':
          variant === 'danger' && !disabled,
        'bg-transparent text-primary border border-primary hover:bg-primary hover:text-text-light focus:ring-primary':
          variant === 'ghost' && !disabled,
        // Sizes
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
        // Disabled
        'opacity-50 cursor-not-allowed': disabled,
      },
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

withDefaults(defineProps<IButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  fullWidth: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
