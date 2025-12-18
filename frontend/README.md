# AG-UI & Microsoft Agent Framework Demo - Frontend

This is the React + TypeScript frontend for the AG-UI & Microsoft Agent Framework demo application.

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

## 📦 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production (TypeScript compilation + Vite build)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality
- **`npm test`** - Run unit tests with Vitest

## 🏗️ Architecture

### Directory Structure

```
src/
├── types/              # TypeScript type definitions
│   ├── User.ts        # User entity and validator
│   ├── Project.ts     # Project entity and validator
│   ├── StreamResponse.ts  # Streaming response wrapper
│   └── ApiResponse.ts # API response wrapper
│
├── services/          # Business logic and data services
│   ├── GraphAgent.ts  # Graph API agent (Microsoft Agent Framework pattern)
│   ├── aguiProtocolService.ts  # AG-UI Protocol streaming service
│   └── mockData.ts    # Mock Graph API data
│
├── hooks/             # Custom React hooks
│   ├── useAGUIProtocol.ts  # AG-UI Protocol connection hook
│   └── useStreamingData.ts # Streaming data management hook
│
├── components/        # React components
│   ├── agui/         # AG-UI base components
│   │   ├── AGCard.tsx
│   │   ├── AGButton.tsx
│   │   ├── AGStreamingList.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorDisplay.tsx
│   │
│   ├── users/        # User-specific components
│   │   ├── UserCard.tsx
│   │   └── UserList.tsx
│   │
│   └── projects/     # Project-specific components
│       ├── ProjectCard.tsx
│       └── ProjectList.tsx
│
├── pages/            # Page components
│   ├── HomePage.tsx
│   ├── UsersPage.tsx
│   └── ProjectsPage.tsx
│
└── test/            # Test files
    ├── setup.ts
    ├── GraphAgent.test.ts
    └── typeValidators.test.ts
```

### Key Technologies

- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **CSS Modules** - Scoped styling
- **Vitest** - Unit testing

## 🎯 Key Features

### 1. Streaming Data with AG-UI Protocol

The app simulates real-time data streaming from a backend:

```typescript
// Hook usage
const { users, isStreaming, streamUsers } = useStreamingData();

// Start streaming
await streamUsers();
```

### 2. Microsoft Agent Framework Pattern

GraphAgent encapsulates all Graph API interactions:

```typescript
// Agent usage
import { graphAgent } from './services/GraphAgent';

const users = await graphAgent.getUsers();
const projects = await graphAgent.getProjects();
```

### 3. AG-UI Components

Reusable UI components following AG-UI principles:

```typescript
<AGCard>
  <AGButton variant="primary" onClick={handleClick}>
    Click Me
  </AGButton>
</AGCard>
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Coverage

- GraphAgent service tests
- Type validator tests
- More tests coming soon!

## 📝 Code Style

The project follows:

- **ESLint** for linting
- **TypeScript** for type safety
- **No `any` types** - Use `unknown` instead
- **Type-only imports** - Use `import type` for types
- **JSDoc comments** for all public APIs
- **CSS Modules** for component styling

## 🎨 Styling Guidelines

- Use CSS Modules for component-specific styles
- Follow BEM-like naming in class names
- Use CSS variables for theming (if needed)
- Keep animations smooth (60fps)
- Ensure responsive design (mobile-first)

## 🔍 Debugging

### Development Tools

1. **React DevTools** - Browser extension for React debugging
2. **Vite DevTools** - Built into dev server
3. **Browser DevTools** - Network, console, performance

### Common Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run build
```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview)

## 🎓 For Learning

This codebase is designed to be educational. Look for:

- **JSDoc comments** explaining function purposes
- **Inline comments** for complex logic
- **Type definitions** serving as documentation
- **Test files** showing usage examples

## 🤝 Contributing

When making changes:

1. Run linter: `npm run lint`
2. Run tests: `npm test`
3. Build: `npm run build`
4. Test in browser: `npm run dev`

## 📄 Specification

For full specification and requirements, see:
- [Feature Spec](./specs/001-agui-msagent-integration/spec.md)
- [Implementation Plan](./specs/001-agui-msagent-integration/plan.md)
- [Data Models](./specs/001-agui-msagent-integration/data-model.md)

---

Built with ❤️ using React + TypeScript + Vite
