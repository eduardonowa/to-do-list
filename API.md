# API Documentation

This project uses JSON Server with JWT authentication for the mock API.

## Setup

### Start the API Server

```bash
npm run api
```

The server will start on `http://localhost:3001`

## Authentication

### Login

**POST** `/auth/login`

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

The token is stored in localStorage and automatically added to all subsequent requests.

## Tasks API

All task endpoints require authentication (except GET requests for testing).

### Get All Tasks

**GET** `/tasks`

Returns all tasks for the authenticated user.

### Get Task by ID

**GET** `/tasks/:id`

Returns a specific task.

### Create Task

**POST** `/tasks`

Request body:

```json
{
  "title": "Task Title",
  "description": "Task description",
  "category": "Personal",
  "priority": "High",
  "dueDate": "2024-12-31"
}
```

### Update Task

**PATCH** `/tasks/:id`

Request body (all fields optional):

```json
{
  "title": "Updated Title",
  "completed": true
}
```

### Delete Task

**DELETE** `/tasks/:id`

Deletes a task.

## Usage in Code

```typescript
import { authService, taskService } from '@/services/api';

// Login
const { user, token } = await authService.login({
  email: 'user@example.com',
  password: 'password123',
});

// Get tasks
const tasks = await taskService.getTasks();

// Create task
const newTask = await taskService.createTask({
  title: 'New Task',
  description: 'Description',
  category: 'Personal',
  priority: 'Medium',
  dueDate: '2024-12-31',
});

// Update task
await taskService.updateTask(1, { completed: true });

// Delete task
await taskService.deleteTask(1);
```

## Default User

- Email: `user@example.com`
- Password: `password123`
