<template>
  <div class="min-h-screen bg-bg-light">
    <header class="bg-bg-default border-b border-border shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col justify-start items-start">
            <img
              src="@/assets/icons/bext-logo.svg"
              alt="Logo"
              class="w-[80px] h-[30px] md:w-[100px] md:h-[40px]"
            />
            <h1 class="text-2xl md:text-3xl font-bold text-text-primary">Task Manager</h1>
          </div>
          <div class="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4">
            <span class="text-text-secondary">{{ authStore.user?.email }}</span>
            <Button variant="ghost" size="sm" @click="handleLogout"> Logout </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-text-primary">My Tasks</h2>
            <p class="text-sm text-text-secondary">
              Manage your tasks, organize by category and keep track of priorities.
            </p>
            <Button variant="primary" size="sm" class="mt-3" @click="openCreateModal">
              Add Task
            </Button>
          </div>
          <div class="flex flex-col md:flex-row gap-3 mt-2 md:mt-0">
            <Select
              :model-value="tasksStore.selectedCategory"
              label="Category"
              :options="categoryFilterOptions"
              class="min-w-[150px]"
              @update:model-value="value => tasksStore.setCategoryFilter(String(value))"
            />
            <Select
              :model-value="tasksStore.selectedPriority"
              label="Priority"
              :options="priorityFilterOptions"
              class="min-w-[150px]"
              @update:model-value="value => tasksStore.setPriorityFilter(String(value))"
            />
          </div>
        </div>
      </div>

      <div v-if="tasksStore.isLoading" class="text-center py-12">
        <p class="text-text-secondary">Loading tasks...</p>
      </div>

      <div v-else-if="tasksStore.error" class="text-center py-12">
        <p class="text-warren-terracota">{{ tasksStore.error }}</p>
      </div>

      <div v-else-if="tasksStore.filteredTasks.length === 0" class="text-center py-12">
        <p class="text-text-secondary mb-4">
          No tasks found. Click the button above to create your first task.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard
          v-for="task in tasksStore.filteredTasks"
          :key="task.id"
          :task="task"
          @click="openEditModal(task)"
          @toggle="handleToggleTask(task.id, !task.completed)"
          @edit="openEditModal(task)"
          @delete="handleDeleteTask(task.id)"
        />
      </div>
    </main>

    <Modal
      :is-open="isCreateModalOpen"
      :title="isEditing ? 'Edit Task' : 'Create Task'"
      size="md"
      @close="closeCreateModal"
    >
      <form class="space-y-4" @submit.prevent="handleSubmitTask">
        <Input
          v-model="form.title"
          label="Title"
          placeholder="Enter task title"
          :error="errors.title"
          required
        />

        <Textarea
          v-model="form.description"
          label="Description"
          placeholder="Describe the task (optional)"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            v-model="form.category"
            label="Category"
            :options="categoryOptions"
            placeholder="Select a category"
            :error="errors.category"
            required
          />

          <Select
            v-model="form.priority"
            label="Priority"
            :options="priorityOptions"
            placeholder="Select a priority"
            :error="errors.priority"
            required
          />
        </div>

        <Input
          v-model="form.dueDate"
          type="date"
          label="Due Date"
          :error="errors.dueDate"
          required
        />

        <div class="flex justify-end gap-3 pt-4">
          <Button variant="ghost" type="button" @click="closeCreateModal">Cancel</Button>
          <Button type="submit" variant="primary" :disabled="tasksStore.isLoading">
            {{ tasksStore.isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Save Task' }}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useTasksStore } from '@/stores/tasks';
import { useToastStore } from '@/stores/toast';
import type { ITaskFormData } from '@/types';
import { Button, Input, Textarea, Select, Modal } from '@/components/common';
import { TaskCard } from '@/components/tasks';

const router = useRouter();
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const toastStore = useToastStore();

const isCreateModalOpen = ref(false);
const isEditing = ref(false);
const editingTaskId = ref<number | null>(null);

const form = reactive<ITaskFormData>({
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
  dueDate: '',
});

const errors = reactive<Record<keyof ITaskFormData, string>>({
  title: '',
  description: '',
  category: '',
  priority: '',
  dueDate: '',
});

const categoryOptions = [
  { value: 'Personal', label: 'Personal' },
  { value: 'Work', label: 'Work' },
  { value: 'Study', label: 'Study' },
];

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const categoryFilterOptions = computed(() => {
  return [{ value: 'All', label: 'All' }].concat(
    tasksStore.categories.map(category => ({
      value: category,
      label: category,
    }))
  );
});

const priorityFilterOptions = [
  { value: 'All', label: 'All' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const resetForm = () => {
  form.title = '';
  form.description = '';
  form.category = '';
  form.priority = 'Medium';
  form.dueDate = '';

  errors.title = '';
  errors.description = '';
  errors.category = '';
  errors.priority = '';
  errors.dueDate = '';
};

const openCreateModal = () => {
  isEditing.value = false;
  editingTaskId.value = null;
  resetForm();
  isCreateModalOpen.value = true;
};

const openEditModal = (task: ITaskFormData & { id: number }) => {
  isEditing.value = true;
  editingTaskId.value = task.id;

  form.title = task.title;
  form.description = task.description;
  form.category = task.category;
  form.priority = task.priority;
  form.dueDate = task.dueDate;

  errors.title = '';
  errors.description = '';
  errors.category = '';
  errors.priority = '';
  errors.dueDate = '';

  isCreateModalOpen.value = true;
};

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

const validateForm = (): boolean => {
  let isValid = true;

  errors.title = form.title.trim() ? '' : 'Title is required';
  errors.category = form.category ? '' : 'Category is required';
  errors.priority = form.priority ? '' : 'Priority is required';
  errors.dueDate = form.dueDate ? '' : 'Due date is required';

  if (errors.title || errors.category || errors.priority || errors.dueDate) {
    isValid = false;
  }

  return isValid;
};

const handleSubmitTask = async () => {
  if (!validateForm()) {
    return;
  }
  if (isEditing.value && editingTaskId.value != null) {
    const result = await tasksStore.updateTask(editingTaskId.value, form);
    if (result.success) {
      toastStore.showToast('Task updated successfully!', 'success');
      closeCreateModal();
    } else if (result.error) {
      toastStore.showToast(result.error, 'error');
    }
  } else {
    const result = await tasksStore.createTask(form);
    if (result.success) {
      toastStore.showToast('Task created successfully!', 'success');
      closeCreateModal();
    } else if (result.error) {
      toastStore.showToast(result.error, 'error');
    }
  }
};

const handleDeleteTask = async (taskId: number) => {
  const result = await tasksStore.deleteTask(taskId);
  if (result.success) {
    toastStore.showToast('Task deleted successfully!', 'success');
  } else if (result.error) {
    toastStore.showToast(result.error, 'error');
  }
};

const handleToggleTask = async (taskId: number, completed: boolean) => {
  const result = await tasksStore.toggleTaskComplete(taskId, completed);
  if (!result.success && result.error) {
    toastStore.showToast(result.error, 'error');
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(async () => {
  try {
    await tasksStore.fetchTasks();
    if (tasksStore.error) {
      toastStore.showToast(tasksStore.error, 'error');
    }
  } catch {
    toastStore.showToast('Failed to load tasks. Please refresh the page.', 'error');
  }
});
</script>
