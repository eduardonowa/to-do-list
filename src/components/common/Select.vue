<template>
  <div class="w-full relative">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-text-primary mb-1">
      {{ label }}
      <span v-if="required" class="text-warren-terracota">*</span>
    </label>
    <div class="relative">
      <button
        ref="buttonRef"
        :id="selectId"
        type="button"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-bg-default text-left flex items-center justify-between',
          {
            'border-border text-text-primary focus:border-primary focus:ring-primary':
              !hasError && !disabled && !isOpen,
            'border-primary text-text-primary ring-2 ring-primary ring-offset-1':
              !hasError && !disabled && isOpen,
            'border-warren-terracota text-text-primary focus:border-warren-terracota focus:ring-warren-terracota':
              hasError && !disabled,
            'border-border bg-bg-light text-text-secondary cursor-not-allowed': disabled,
          },
        ]"
        @click.stop="toggleDropdown"
      >
        <span :class="{ 'text-text-secondary': !selectedLabel }">
          {{ selectedLabel || placeholder || 'Select an option' }}
        </span>
        <svg
          class="w-5 h-5 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="absolute z-50 w-full mt-1 bg-bg-default border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
      >
        <button
          v-if="placeholder"
          type="button"
          :class="[
            'w-full px-4 py-2 text-left hover:bg-bg-light transition-colors',
            !modelValue || modelValue === ''
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-text-primary',
          ]"
          @click.stop="selectOption('')"
        >
          {{ placeholder }}
        </button>
        <button
          v-for="option in options"
          :key="String(option.value)"
          type="button"
          :class="[
            'w-full px-4 py-2 text-left hover:bg-bg-light transition-colors',
            String(modelValue) === String(option.value)
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-text-primary',
          ]"
          @click.stop="selectOption(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-warren-terracota">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

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
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  if (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined) {
    return '';
  }
  const option = props.options.find(opt => String(opt.value) === String(props.modelValue));
  return option?.label || '';
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (value: string | number) => {
  emit('update:modelValue', value);
  closeDropdown();
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (
    isOpen.value &&
    dropdownRef.value &&
    buttonRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    !buttonRef.value.contains(event.target as Node)
  ) {
    closeDropdown();
  }
};

// Close on escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>
