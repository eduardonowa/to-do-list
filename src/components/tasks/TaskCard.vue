<template>
  <div
    :class="[
      'bg-bg-default border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer',
      isOverdue && !task.completed
        ? 'border-border hover:border-[#c7452d]'
        : 'border-border hover:border-primary',
    ]"
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
              'text-lg font-semibold leading-5',
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
      <div class="flex items-center gap-2 ml-2">
        <button
          class="text-text-secondary hover:text-warren-terracota transition-colors"
          title="Delete task"
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
    <p
      v-if="isOverdue"
      class="mt-2 text-xs font-medium text-warren-terracota flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      This task is overdue
    </p>
  </div>
</template>

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
  edit: [task: ITask];
  delete: [taskId: number];
}>();

const priorityColors = {
  Low: 'bg-warren-solitude text-warren-storm-gray border-warren-gainsboro',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
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

const isOverdue = computed(() => {
  if (!props.task.dueDate || props.task.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(props.task.dueDate);
  due.setHours(0, 0, 0, 0);

  return due < today;
});
</script>
<!-- pipeline test comment -->
