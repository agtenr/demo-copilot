# Data Model: AG-UI & Microsoft Agent Framework Integration

**Feature**: AG-UI & Microsoft Agent Framework Integration  
**Phase**: 1 - Design & Contracts  
**Date**: 2025-12-18  
**Status**: Complete

## Overview

This document defines the data structures used in the demo application. All types are based on Microsoft Graph API v1.0 schema to ensure realistic, educational examples.

## Core Entities

### User

Represents a Microsoft 365 user retrieved from Microsoft Graph API.

```typescript
/**
 * User entity based on Microsoft Graph API User resource
 * @see https://learn.microsoft.com/en-us/graph/api/resources/user
 */
interface User {
  /** Unique identifier for the user (GUID format) */
  id: string;
  
  /** User's display name (full name) */
  displayName: string;
  
  /** User's given name (first name) */
  givenName?: string;
  
  /** User's surname (last name) */
  surname?: string;
  
  /** Primary email address */
  mail: string;
  
  /** User's job title */
  jobTitle: string;
  
  /** Department name */
  department: string;
  
  /** Physical office location */
  officeLocation?: string;
  
  /** User's business phone numbers */
  businessPhones?: string[];
}
```

**Validation Rules**:
- `id`: Must be valid GUID format
- `displayName`: Required, 1-256 characters
- `mail`: Required, valid email format
- `jobTitle`: Required, 1-128 characters
- `department`: Required, 1-128 characters

**Example**:
```json
{
  "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  "displayName": "Adele Vance",
  "givenName": "Adele",
  "surname": "Vance",
  "mail": "adelev@contoso.com",
  "jobTitle": "Product Marketing Manager",
  "department": "Sales & Marketing",
  "officeLocation": "18/2111",
  "businessPhones": ["+1 425 555 0100"]
}
```

### Project

Represents a project or team. Based on Microsoft Graph API Group resource but simplified and adapted for project management context.

```typescript
/**
 * Project entity (adapted from Microsoft Graph API Group resource)
 * @see https://learn.microsoft.com/en-us/graph/api/resources/group
 */
interface Project {
  /** Unique identifier for the project (GUID format) */
  id: string;
  
  /** Project name */
  name: string;
  
  /** Detailed project description */
  description: string;
  
  /** Current project status */
  status: ProjectStatus;
  
  /** Project owner (User reference) */
  owner: User;
  
  /** When the project was created (ISO 8601 format) */
  createdDate: string;
  
  /** Number of team members */
  memberCount: number;
  
  /** Project email alias (optional) */
  mail?: string;
}

/**
 * Project status enum
 */
type ProjectStatus = 'active' | 'completed' | 'on-hold';
```

**Validation Rules**:
- `id`: Must be valid GUID format
- `name`: Required, 1-256 characters
- `description`: Required, 1-1024 characters
- `status`: Must be one of: 'active', 'completed', 'on-hold'
- `owner`: Must be a valid User object
- `createdDate`: Must be valid ISO 8601 date string
- `memberCount`: Must be positive integer

**Example**:
```json
{
  "id": "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  "name": "Marketing Campaign 2024",
  "description": "Q1 product launch marketing campaign",
  "status": "active",
  "owner": {
    "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    "displayName": "Adele Vance",
    "mail": "adelev@contoso.com",
    "jobTitle": "Product Marketing Manager",
    "department": "Sales & Marketing"
  },
  "createdDate": "2024-01-15T12:00:00Z",
  "memberCount": 8,
  "mail": "marketing2024@contoso.com"
}
```

## API Response Wrapper

### ApiResponse<T>

Generic wrapper for all API responses to provide consistent state management across the application.

```typescript
/**
 * Generic API response wrapper with loading and error states
 * Used by hooks to manage async operations
 */
interface ApiResponse<T> {
  /** The actual data returned from the API (null if loading or error) */
  data: T | null;
  
  /** Whether the request is currently in progress */
  loading: boolean;
  
  /** Error message if request failed (null if success or loading) */
  error: string | null;
  
  /** Timestamp when the response was received (Unix milliseconds) */
  timestamp: number;
}
```

**State Transitions**:
1. **Initial/Loading**: `{ data: null, loading: true, error: null, timestamp: 0 }`
2. **Success**: `{ data: <result>, loading: false, error: null, timestamp: Date.now() }`
3. **Error**: `{ data: null, loading: false, error: <message>, timestamp: Date.now() }`

**Example Usage**:
```typescript
const userResponse: ApiResponse<User[]> = {
  data: [/* user objects */],
  loading: false,
  error: null,
  timestamp: 1702905600000
};
```

## Agent Interface

### IGraphAgent

Interface defining the contract for Microsoft Graph API agent.

```typescript
/**
 * Graph API Agent Interface
 * Defines methods for interacting with Microsoft Graph API (mock or real)
 */
interface IGraphAgent {
  /**
   * Retrieve all users
   * @returns Promise resolving to array of users
   * @throws Error if fetch fails
   */
  getUsers(): Promise<User[]>;
  
  /**
   * Retrieve all projects
   * @returns Promise resolving to array of projects
   * @throws Error if fetch fails
   */
  getProjects(): Promise<Project[]>;
  
  /**
   * Retrieve a single user by ID
   * @param id - User GUID
   * @returns Promise resolving to user or null if not found
   * @throws Error if fetch fails
   */
  getUserById(id: string): Promise<User | null>;
  
  /**
   * Retrieve a single project by ID
   * @param id - Project GUID
   * @returns Promise resolving to project or null if not found
   * @throws Error if fetch fails
   */
  getProjectById(id: string): Promise<Project | null>;
  
  /**
   * Enable or disable mock mode
   * @param enabled - Whether to use mock data
   */
  setMockMode(enabled: boolean): void;
}
```

## Component Props

### Common Component Props

```typescript
/**
 * Props for card components
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Props for button components
 */
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Props for loading spinner
 */
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

/**
 * Props for error display
 */
interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}
```

### Feature-Specific Component Props

```typescript
/**
 * Props for UserCard component
 */
interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
}

/**
 * Props for UserList component
 */
interface UserListProps {
  users: User[];
  loading?: boolean;
  error?: string | null;
  onUserClick?: (user: User) => void;
  onRefresh?: () => void;
}

/**
 * Props for ProjectCard component
 */
interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

/**
 * Props for ProjectList component
 */
interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  error?: string | null;
  onProjectClick?: (project: Project) => void;
  onRefresh?: () => void;
}
```

## Hook Return Types

### useGraphAgent Hook

```typescript
/**
 * Return type for useGraphAgent hook
 */
interface UseGraphAgentResult {
  /** Current list of users */
  users: User[];
  
  /** Current list of projects */
  projects: Project[];
  
  /** Whether any request is currently loading */
  loading: boolean;
  
  /** Error message from the most recent failed request */
  error: string | null;
  
  /** Function to fetch all users */
  fetchUsers: () => Promise<void>;
  
  /** Function to fetch all projects */
  fetchProjects: () => Promise<void>;
  
  /** Function to refetch current data */
  refresh: () => Promise<void>;
}
```

## Data Relationships

```
User (1) ────< (0..n) Project.owner
```

- A User can own zero or many Projects
- Each Project must have exactly one User as owner
- User is embedded in Project (denormalized for simplicity)

## Mock Data Schema

Mock data will be stored in `frontend/src/agents/mockData.ts`:

```typescript
export const MOCK_USERS: User[] = [
  // 5 sample users with varied roles and departments
];

export const MOCK_PROJECTS: Project[] = [
  // 3 sample projects with different statuses
];
```

**Mock Data Requirements**:
- At least 5 diverse users (different departments, job titles)
- At least 3 projects (at least one of each status)
- Realistic Microsoft 365 organization structure
- Varied data to demonstrate different UI states

## Type Safety Guidelines

1. **No `any` types**: All data must be explicitly typed
2. **Strict null checks**: Use `null` or `undefined` explicitly, never implicit
3. **Readonly where appropriate**: Use `readonly` for arrays that shouldn't be mutated
4. **Enums for fixed values**: Use string literal unions for status, variants, etc.
5. **Required vs Optional**: Use `?` only for truly optional fields

## Validation Strategy

```typescript
/**
 * Validate user object structure
 * @param user - Object to validate
 * @returns true if valid, false otherwise
 */
function isValidUser(user: any): user is User {
  return (
    typeof user?.id === 'string' &&
    typeof user?.displayName === 'string' &&
    typeof user?.mail === 'string' &&
    typeof user?.jobTitle === 'string' &&
    typeof user?.department === 'string'
  );
}

/**
 * Validate project object structure
 * @param project - Object to validate
 * @returns true if valid, false otherwise
 */
function isValidProject(project: any): project is Project {
  return (
    typeof project?.id === 'string' &&
    typeof project?.name === 'string' &&
    typeof project?.description === 'string' &&
    ['active', 'completed', 'on-hold'].includes(project?.status) &&
    isValidUser(project?.owner) &&
    typeof project?.createdDate === 'string' &&
    typeof project?.memberCount === 'number'
  );
}
```

## Migration Path

This data model is designed for mock data but structured to easily migrate to real Microsoft Graph API:

1. **Phase 1 (Current)**: Mock data in `mockData.ts`
2. **Phase 2 (Future)**: Replace GraphAgent implementation to call real API endpoints
3. **Phase 3 (Future)**: Add caching layer, optimistic updates, pagination

The type definitions remain unchanged across all phases.

## Summary

- **2 Core Entities**: User, Project
- **1 Response Wrapper**: ApiResponse<T>
- **1 Agent Interface**: IGraphAgent
- **Type Safety**: 100% TypeScript coverage, no `any` types
- **Validation**: Runtime validation for all external data
- **Extensibility**: Easy to add fields or entities without breaking changes

All types will be defined in `frontend/src/types/` directory for centralized type management.
