<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Textarea, Select, Modal } from '@/components/common';
import { TaskCard } from '@/components/tasks';
import type { ITask } from '@/types';

// Form states
const email = ref('');
const password = ref('');
const description = ref('');
const category = ref('');
const priority = ref('');

// Modal state
const isModalOpen = ref(false);

// Task for demo
const demoTask: ITask = {
  id: 1,
  title: 'Example Task',
  description: 'This is an example task to demonstrate the TaskCard component',
  category: 'Personal',
  priority: 'High',
  dueDate: '2024-12-31',
  completed: false,
  userId: 1,
};

const selectOptions = [
  { value: 'Personal', label: 'Personal' },
  { value: 'Work', label: 'Work' },
  { value: 'Study', label: 'Study' },
];

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const handleButtonClick = (variant: string) => {
  console.log(`${variant} button clicked`);
};

const handleTaskClick = (task: ITask) => {
  console.log('Task clicked:', task);
};

const handleTaskToggle = (task: ITask) => {
  console.log('Task toggled:', task);
};

const handleTaskDelete = (taskId: number) => {
  console.log('Task deleted:', taskId);
};
</script>

<template>
  <div class="min-h-screen bg-bg-light p-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-text-primary mb-2">Component Library Demo</h1>
        <p class="text-text-secondary">
          Demonstration of all micro components and their variations
        </p>
      </div>

      <!-- Buttons Section -->
      <section class="bg-bg-default rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-text-primary mb-6">Buttons</h2>

        <div class="space-y-6">
          <!-- Variants -->
          <div>
            <h3 class="text-lg font-medium text-text-primary mb-4">Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary" @click="handleButtonClick('primary')">
                Primary Button
              </Button>
              <Button variant="secondary" @click="handleButtonClick('secondary')">
                Secondary Button
              </Button>
              <Button variant="danger" @click="handleButtonClick('danger')"> Danger Button </Button>
              <Button variant="ghost" @click="handleButtonClick('ghost')"> Ghost Button </Button>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-lg font-medium text-text-primary mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-lg font-medium text-text-primary mb-4">States</h3>
            <div class="flex flex-wrap gap-4">
              <Button>Normal Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button full-width>Full Width Button</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Components Section -->
      <section class="bg-bg-default rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-text-primary mb-6">Form Components</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Input Examples -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-text-primary">Input</h3>

            <Input
              v-model="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              required
            />

            <Input
              v-model="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
            />

            <Input v-model="email" label="Input with Error" error="This field is required" />

            <Input
              v-model="email"
              label="Disabled Input"
              placeholder="This input is disabled"
              disabled
            />
          </div>

          <!-- Textarea & Select Examples -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-text-primary">Textarea & Select</h3>

            <Textarea
              v-model="description"
              label="Description"
              placeholder="Enter task description"
              :rows="4"
            />

            <Textarea
              v-model="description"
              label="Textarea with Error"
              error="Description is required"
            />

            <Select
              v-model="category"
              label="Category"
              :options="selectOptions"
              placeholder="Select a category"
            />

            <Select
              v-model="priority"
              label="Priority"
              :options="priorityOptions"
              error="Please select a priority"
            />
          </div>
        </div>
      </section>

      <!-- Task Card Section -->
      <section class="bg-bg-default rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-text-primary mb-6">Task Card</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Personal Task -->
          <TaskCard
            :task="demoTask"
            @click="handleTaskClick"
            @toggle="handleTaskToggle"
            @delete="handleTaskDelete"
          />

          <!-- Work Task -->
          <TaskCard
            :task="{
              ...demoTask,
              id: 2,
              title: 'Work Task',
              category: 'Work',
              priority: 'Medium',
            }"
            @click="handleTaskClick"
            @toggle="handleTaskToggle"
            @delete="handleTaskDelete"
          />

          <!-- Completed Task -->
          <TaskCard
            :task="{
              ...demoTask,
              id: 3,
              title: 'Completed Task',
              category: 'Study',
              priority: 'Low',
              completed: true,
            }"
            @click="handleTaskClick"
            @toggle="handleTaskToggle"
            @delete="handleTaskDelete"
          />
        </div>
      </section>

      <!-- Modal Section -->
      <section class="bg-bg-default rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-text-primary mb-6">Modal</h2>

        <div class="flex flex-wrap gap-4">
          <Button variant="primary" @click="isModalOpen = true"> Open Modal </Button>
        </div>

        <Modal :is-open="isModalOpen" title="Example Modal" size="md" @close="isModalOpen = false">
          <div class="space-y-4">
            <p class="text-text-primary">
              This is an example modal demonstrating the Modal component.
            </p>
            <p class="text-text-secondary">
              You can close it by clicking the X button, clicking outside, or pressing ESC.
            </p>
            <div class="flex justify-end gap-2 mt-6">
              <Button variant="ghost" @click="isModalOpen = false"> Cancel </Button>
              <Button variant="primary" @click="isModalOpen = false"> Confirm </Button>
            </div>
          </div>
        </Modal>
      </section>

      <!-- Modal Sizes Section -->
      <section class="bg-bg-default rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-semibold text-text-primary mb-6">Modal Sizes</h2>

        <div class="flex flex-wrap gap-4">
          <Button variant="primary" @click="isModalOpen = true"> Small Modal </Button>
          <Button variant="primary" @click="isModalOpen = true"> Medium Modal </Button>
          <Button variant="primary" @click="isModalOpen = true"> Large Modal </Button>
          <Button variant="primary" @click="isModalOpen = true"> Extra Large Modal </Button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
