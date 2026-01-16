# BextTeste

Technical challenge built with Vue 3, Vite, Pinia and Tailwind CSS.

## Tech Stack

- **Vue 3** + **TypeScript** - Framework front-end
- **Pinia** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **JSON Server** - Mock API with JWT authentication
- **Jest** - Testing framework
- **ESLint & Prettier** - Code quality and formatting
- **Husky** - Git hooks

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.x or higher)
- **npm** (comes with Node.js)

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bext-test
```

### 2. Install Dependencies

```bash
npm install
```

This will install all project dependencies including:

- Vue 3 and related packages
- Development tools (ESLint, Prettier, Jest, etc.)
- Build tools (Vite, TypeScript, etc.)

### 3. Environment Configuration (Optional)

The project uses environment variables for configuration. Create a `.env` file in the root directory if you need to customize settings:

```env
# JWT Secret Key (default: 'dev-secret-key')
JWT_SECRET=your-secret-key-here

# API Server Port (default: 3001)
PORT=3001
```

> **Note:** The project works out of the box without a `.env` file using default values.

## Running the Project

### Development Mode

The project requires two terminals: one for the API server and one for the front-end.

#### Terminal 1: Start the API Server

```bash
npm run api
```

The API server will start on `http://localhost:3001`

#### Terminal 2: Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port)

### Default Login Credentials

Use these credentials to log in:

- **Email:** `user@example.com`
- **Password:** `password123`

## Available Scripts

### Development

- `npm run dev` - Start the Vite development server
- `npm run api` - Start the JSON Server API (runs on port 3001)
- `npm run preview` - Preview the production build locally

### Building

- `npm run build` - Build the project for production (outputs to `dist/`)

### Code Quality

- `npm run lint` - Run ESLint and auto-fix issues
- `npm run lint:check` - Check for linting errors without fixing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without fixing

### Testing

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Pre-commit Checks

- `npm run pre-commit:check` - Run full checks (lint, format, tests)
- `npm run pre-commit:quick` - Run quick checks (lint, format only)

## Project Structure

```
bext-test/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline configuration
├── .husky/
│   └── pre-commit          # Git pre-commit hook
├── public/                 # Static assets
├── server/
│   ├── db.json            # JSON Server database
│   └── index.ts           # API server with JWT auth
├── src/
│   ├── assets/            # Images, icons, styles
│   ├── components/        # Vue components
│   │   ├── common/        # Reusable UI components
│   ├── router/            # Vue Router configuration
│   ├── services/          # API service layer
│   ├── stores/            # Pinia stores (auth, tasks, toast)
│   ├── types/             # TypeScript type definitions
│   ├── views/             # Page components (Login, Dashboard)
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── .editorconfig          # Editor configuration
├── .gitattributes         # Git line endings configuration
├── .prettierrc            # Prettier configuration
├── eslint.config.mjs      # ESLint configuration
├── jest.config.cjs         # Jest test configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Features

### Authentication

- Login with email and password
- JWT token-based authentication
- Automatic token storage in localStorage
- Protected routes

### Task Management

- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by category and priority
- View task details in modal
- Responsive design for mobile and desktop

### Task Properties

- **Title** (required)
- **Description**
- **Category** (Personal, Work, Study)
- **Priority** (Low, Medium, High)
- **Due Date**
- **Completion Status**

## API Documentation

See [API.md](./API.md) for detailed API documentation.

## Testing

The project includes unit tests for:

- Store actions, getters, and state
- Service layer (API calls)
- Component structure
- Router configuration

Run tests with:

```bash
npm test
```

## Code Quality

The project uses:

- **ESLint** for code linting (configured for Vue 3 + TypeScript)
- **Prettier** for code formatting
- **Husky** for Git hooks (pre-commit checks)
- **lint-staged** for running checks on staged files only

### Pre-commit Hooks

Before each commit, the following checks run automatically:

1. **lint-staged** - Fixes and formats staged files
2. **Lint check** - Verifies no linting errors
3. **Format check** - Verifies code formatting
4. **Tests** - Runs all unit tests

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on:

- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

The pipeline executes:

1. Linter check
2. Formatter check
3. Unit tests with coverage
4. TypeScript type checking
5. Production build
