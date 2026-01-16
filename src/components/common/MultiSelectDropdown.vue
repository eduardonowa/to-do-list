<template>
  <div class="w-full relative min-w-[200px]">
    <label v-if="label" :for="componentId" class="block text-sm font-medium text-text-primary mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <button
        :id="componentId"
        ref="buttonRef"
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
        <span :class="{ 'text-text-secondary': selectedCount === 0 }">
          {{ displayText }}
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
          v-for="option in options"
          :key="String(option.value)"
          type="button"
          :class="[
            'w-full px-4 py-2 text-left hover:bg-bg-light transition-colors flex items-center gap-2',
            isSelected(option.value)
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-text-primary',
          ]"
          @click.stop="toggleOption(option.value)"
        >
          <svg
            v-if="isSelected(option.value)"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span v-else class="w-4 h-4"></span>
          <span>{{ option.label }}</span>
        </button>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-warren-terracota">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';

interface IMultiSelectOption {
  value: string | number;
  label: string;
}

interface IMultiSelectDropdownProps {
  modelValue: (string | number)[];
  label?: string;
  options: IMultiSelectOption[];
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<IMultiSelectDropdownProps>(), {
  disabled: false,
  placeholder: 'Select options',
});

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]];
}>();

const instance = getCurrentInstance();
const componentId = `multiselect-${instance?.uid || Math.random().toString(36).substr(2, 9)}`;

const hasError = computed(() => !!props.error);
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const selectedCount = computed(() => props.modelValue.length);

const displayText = computed(() => {
  if (selectedCount.value === 0) {
    return props.placeholder || 'Select options';
  }
  if (selectedCount.value === 1) {
    const selected = props.options.find(opt => props.modelValue.includes(opt.value));
    return selected?.label || `${selectedCount.value} selected`;
  }
  return `${selectedCount.value} selected`;
});

const isSelected = (value: string | number) => {
  return props.modelValue.includes(value);
};

const toggleOption = (value: string | number) => {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(value);

  if (index > -1) {
    newValue.splice(index, 1);
  } else {
    newValue.push(value);
  }

  emit('update:modelValue', newValue);
};

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
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
