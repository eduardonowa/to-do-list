<script setup lang="ts">
import type { ITask } from '@/types';
import { computed } from 'vue';

interface ITaskCardProps {
  task: ITask;
}

const props = defineProps<ITaskCardProps>();

const emit = defineEmits<{
  click: [task: ITask];
  toggle: [task: ITask];
  delete: [taskId: number];
}>();

const priorityColors = {
  Low: 'bg-warren-solitude text-warren-storm-gray border-warren-gainsboro',
  Medium: 'bg-warren-hint-of-red text-warren-mortar border-warren-metropole',
  High: 'bg-warren-terracota/10 text-warren-terracota border-warren-terracota',
};

const categoryColors = {
  Personal: 'bg-primary/10 text-primary',
  Work: 'bg-warren-gold/10 text-warren-gold',
  Study: 'bg-primary-light/10 text-primary-light',
};

const formattedDate = computed(() => {
  if (!props.task.dueDate) return '';
  return new Date(props.task.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
});
</script>

<template>
  <div
    class="bg-bg-default border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    @click="emit('click', task)"
  >
    <div class="flex items-start justify-between mb-2">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            :checked="task.completed"
            class="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            @click.stop="emit('toggle', task)"
          />
          <h3
            :class="[
              'text-lg font-semibold',
              task.completed ? 'line-through text-text-secondary' : 'text-text-primary',
            ]"
          >
            {{ task.title }}
          </h3>
        </div>
        <p
          v-if="task.description"
          :class="['text-sm mb-2', task.completed ? 'text-text-secondary' : 'text-text-primary']"
        >
          {{ task.description }}
        </p>
      </div>
      <button
        class="text-text-secondary hover:text-warren-terracota transition-colors ml-2"
        @click.stop="emit('delete', task.id)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <span
        :class="[
          'px-2 py-1 rounded text-xs font-medium border',
          categoryColors[task.category as keyof typeof categoryColors] ||
            'bg-bg-light text-text-secondary border-border',
        ]"
      >
        {{ task.category }}
      </span>
      <span
        :class="['px-2 py-1 rounded text-xs font-medium border', priorityColors[task.priority]]"
      >
        {{ task.priority }}
      </span>
      <span v-if="task.dueDate" class="text-xs text-text-secondary flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {{ formattedDate }}
      </span>
    </div>
  </div>
</template>
