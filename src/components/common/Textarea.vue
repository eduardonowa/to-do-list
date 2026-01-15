<template>
  <div class="w-full">
    <label v-if="label" :for="textareaId" class="block text-sm font-medium text-text-primary mb-1">
      {{ label }}
      <span v-if="required" class="text-warren-terracota">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="[
        'w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none',
        {
          'border-border bg-bg-default text-text-primary focus:border-primary focus:ring-primary':
            !hasError && !disabled,
          'border-warren-terracota bg-bg-default text-text-primary focus:border-warren-terracota focus:ring-warren-terracota':
            hasError && !disabled,
          'border-border bg-bg-light text-text-secondary cursor-not-allowed': disabled,
        },
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="error" class="mt-1 text-sm text-warren-terracota">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ITextareaProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false,
  disabled: false,
  rows: 4,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textareaId = computed(() => `textarea-${Math.random().toString(36).substring(2, 11)}`);

const hasError = computed(() => !!props.error);
</script>
