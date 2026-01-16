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
            :disabled="isToggling"
            class="w-4 h-4 text-primary border-border rounded focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
          :disabled="isDeleting"
          class="text-text-secondary hover:text-warren-terracota transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete task"
          @click.stop="emit('delete', task.id)"
        >
          <svg
            v-if="!isDeleting"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <svg
            v-else
            class="animate-spin w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
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
  isDeleting?: boolean;
  isToggling?: boolean;
}

const props = withDefaults(defineProps<ITaskCardProps>(), {
  isDeleting: false,
  isToggling: false,
});

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
  Personal: 'bg-blue-100 text-blue-700 border-blue-300',
  Work: 'bg-amber-100 text-amber-700 border-amber-300',
  Study: 'bg-purple-100 text-purple-700 border-purple-300',
  Health: 'bg-green-100 text-green-700 border-green-300',
  Shopping: 'bg-pink-100 text-pink-700 border-pink-300',
  Finance: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  Travel: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  Family: 'bg-rose-100 text-rose-700 border-rose-300',
  Hobbies: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  Other: 'bg-gray-100 text-gray-700 border-gray-300',
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
