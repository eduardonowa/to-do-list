<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-text-primary mb-1">
      {{ label }}
      <span v-if="required" class="text-warren-terracota">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="on"
      :class="[
        'w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
        {
          'border-border bg-bg-default text-text-primary focus:border-primary focus:ring-primary':
            !hasError && !disabled,
          'border-warren-terracota bg-bg-default text-text-primary focus:border-warren-terracota focus:ring-warren-terracota':
            hasError && !disabled,
          'border-border bg-bg-light text-text-secondary cursor-not-allowed': disabled,
        },
      ]"
      @input="handleInput"
    />
    <p v-if="error && error.trim()" class="mt-1 text-sm text-warren-terracota">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IInputProps {
  modelValue: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [event: Event];
}>();

const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 11)}`);

const hasError = computed(() => !!props.error);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};
</script>
