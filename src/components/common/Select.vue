<template>
  <div class="w-full">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-text-primary mb-1">
      {{ label }}
      <span v-if="required" class="text-warren-terracota">*</span>
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-bg-default',
        {
          'border-border text-text-primary focus:border-primary focus:ring-primary':
            !hasError && !disabled,
          'border-warren-terracota text-text-primary focus:border-warren-terracota focus:ring-warren-terracota':
            hasError && !disabled,
          'border-border bg-bg-light text-text-secondary cursor-not-allowed': disabled,
        },
      ]"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-warren-terracota">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ISelectOption {
  value: string | number;
  label: string;
}

interface ISelectProps {
  modelValue: string | number;
  label?: string;
  options: ISelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<ISelectProps>(), {
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selectId = computed(() => `select-${Math.random().toString(36).substring(2, 11)}`);

const hasError = computed(() => !!props.error);
</script>
