# Quick Start Guide: AG-UI & Microsoft Agent Framework Demo

**Version**: 1.0.0  
**Date**: 2025-12-18  
**Audience**: Novice developers

## Welcome! 👋

This guide will help you get the demo application running in under 5 minutes. This demo shows how to integrate AG-UI components with a Microsoft Agent Framework pattern to fetch and display data from Microsoft Graph API (using mock data).

## What You'll Learn

By running this demo, you'll see working examples of:

- **Agent Pattern**: How to encapsulate API logic in an agent class
- **React Hooks**: Custom hooks for managing API state
- **Component Design**: Building reusable UI components with AG-UI
- **TypeScript**: Type-safe data handling
- **Error Handling**: Graceful error and loading states

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **A code editor** (VS Code recommended)
- **A modern web browser** (Chrome, Firefox, or Safari)

### Check Your Node.js Version

```bash
node --version
```

You should see `v18.x.x` or higher. If not, please update Node.js.

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/agtenr/demo-copilot.git
cd demo-copilot
```

### Step 2: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 3: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

**Expected output**: You'll see packages being installed. This takes about 1-2 minutes.

### Step 4: Start the Development Server

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

**Expected output**:
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

**You should see**: The demo application home page with navigation to Users and Projects.

## Exploring the Demo

### View Mock Users

1. Click on **"View Users"** button or navigate to `/users`
2. You'll see a list of 5 mock users from "Microsoft Graph API"
3. Each user card shows: name, email, job title, and department

**What's happening behind the scenes**:
- `GraphAgent` is called via the `useGraphAgent` hook
- Mock data is returned after a 300ms simulated delay
- AG-UI `Card` components display the data
- Loading state shows while fetching

### View Mock Projects

1. Click on **"View Projects"** button or navigate to `/projects`
2. You'll see a list of 3 mock projects
3. Each project card shows: name, description, status, owner, and member count

**What's happening behind the scenes**:
- Same agent pattern as users
- Projects include embedded user data (owner)
- Status badge colors based on project status (active/completed/on-hold)

### Refresh Data

1. Click the **"Refresh"** button on either page
2. You'll see the loading spinner briefly
3. Data reloads from the agent

**This demonstrates**: How to handle user-triggered data fetching

### See Error Handling

To see how errors are handled:

1. Open browser DevTools Console (F12)
2. Look at the code in `src/agents/GraphAgent.ts`
3. Notice the try-catch blocks and error throwing

In a real scenario, if the API fails, you'd see an error message instead of the data.

## Understanding the Code Structure

Here's where to look for key concepts:

### Agent Pattern

**File**: `src/agents/GraphAgent.ts`

```typescript
class GraphAgent implements IGraphAgent {
  // Encapsulates all Graph API logic
  async getUsers(): Promise<User[]> { ... }
  async getProjects(): Promise<Project[]> { ... }
}
```

**Why this matters**: Separates data fetching from UI components. Makes testing easier.

### Mock Data

**File**: `src/agents/mockData.ts`

```typescript
export const MOCK_USERS: User[] = [ ... ];
export const MOCK_PROJECTS: Project[] = [ ... ];
```

**Why this matters**: Realistic data for development without needing real API credentials.

### Custom Hook

**File**: `src/hooks/useGraphAgent.ts`

```typescript
export function useGraphAgent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // ... manages state for components
}
```

**Why this matters**: Reusable logic across multiple components. Handles loading/error states.

### AG-UI Components

**Files**: `src/components/agui/*.tsx`

```typescript
export const AGCard = ({ children, className }: CardProps) => (
  <div className={`ag-card ${className}`}>
    {children}
  </div>
);
```

**Why this matters**: Consistent, reusable UI components. Easy to style and maintain.

### Type Definitions

**Files**: `src/types/*.ts`

```typescript
interface User {
  id: string;
  displayName: string;
  mail: string;
  // ... full type safety
}
```

**Why this matters**: TypeScript catches errors at compile time, not runtime.

## Making Your First Change

Let's add a new mock user to see how everything works together.

### Step 1: Open Mock Data File

Open `src/agents/mockData.ts` in your code editor.

### Step 2: Add a New User

Add this user object to the `MOCK_USERS` array:

```typescript
{
  id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  displayName: "Your Name",
  givenName: "Your",
  surname: "Name",
  mail: "yourname@contoso.com",
  jobTitle: "Junior Developer",
  department: "Engineering",
  officeLocation: "Remote"
}
```

### Step 3: Save the File

The development server will automatically reload.

### Step 4: View the Change

Refresh your browser or navigate back to `/users`. You should now see 6 users instead of 5!

**Congratulations!** 🎉 You just made your first change to the demo.

## Common Issues & Solutions

### Port 5173 is Already in Use

**Error**: `Port 5173 is already in use`

**Solution**: Either kill the process using that port, or run on a different port:
```bash
npm run dev -- --port 3000
```

### TypeScript Errors

**Error**: Red squiggly lines in your editor

**Solution**: Make sure you have TypeScript extension installed in VS Code. Run:
```bash
npm run build
```

To check for compilation errors.

### Module Not Found

**Error**: `Cannot find module 'react-router-dom'`

**Solution**: Dependencies weren't installed correctly. Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Browser Shows Blank Page

**Check**:
1. Is the dev server running? Check your terminal
2. Any errors in browser console? (F12)
3. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Next Steps

Now that you have the demo running, here are some ideas to explore:

### Beginner Level

1. **Change mock data**: Add more users or projects
2. **Modify styles**: Edit CSS module files to change colors
3. **Add a new field**: Display `officeLocation` on user cards

### Intermediate Level

1. **Create a new view**: Add a "User Details" page for individual users
2. **Add filtering**: Filter users by department
3. **Implement sorting**: Sort projects by status or creation date

### Advanced Level

1. **Add real API**: Replace mock data with actual Microsoft Graph API calls
2. **Add authentication**: Integrate Microsoft Authentication Library (MSAL)
3. **Add state management**: Implement Redux or Zustand for global state
4. **Add more tests**: Write unit tests for components and hooks

## Learn More

### Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview)
- [Vite Guide](https://vitejs.dev/guide/)

### Specification Documents

- [Feature Specification](./spec.md) - Detailed requirements and user stories
- [Implementation Plan](./plan.md) - Technical architecture and approach
- [Data Model](./data-model.md) - Type definitions and schemas
- [API Contracts](./contracts/) - Agent interface and response formats

### Related Concepts

- **Agent Pattern**: Design pattern for encapsulating external service logic
- **Microsoft Semantic Kernel**: Microsoft's agent framework (this demo follows similar principles)
- **React Hooks**: Modern React state management approach
- **TypeScript Generics**: Used in `ApiResponse<T>` wrapper

## Getting Help

If you're stuck:

1. **Check the console**: Browser DevTools (F12) shows errors
2. **Check the terminal**: Server errors appear in the terminal where you ran `npm run dev`
3. **Read the code comments**: Files have extensive inline documentation
4. **Review the spec docs**: In `specs/001-agui-msagent-integration/`

## Summary

✅ You've successfully:
- Installed and ran the demo application
- Explored the user and project views
- Understood the agent pattern and React hooks
- Made your first code change
- Learned where to find key code files

**Time taken**: Less than 5 minutes!

## Tips for Success

- **Read the code comments**: Every file has explanations
- **Use TypeScript**: Let the types guide you
- **Start small**: Make one change at a time
- **Use the browser DevTools**: Essential for debugging
- **Ask questions**: It's okay to not understand everything at once

Happy coding! 🚀
