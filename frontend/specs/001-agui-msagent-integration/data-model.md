# Data Model: AG-UI & Microsoft Agent Framework Integration

**Feature**: AG-UI & Microsoft Agent Framework Integration  
**Phase**: 1 - Design & Contracts  
**Date**: 2025-12-18  
**Status**: Updated for .NET Backend & Streaming

## Overview

This document defines the data structures used in the demo application across both .NET backend and React frontend. All types are based on Microsoft Graph API v1.0 schema to ensure realistic, educational examples. Includes streaming response types for real-time data delivery.

## Core Entities

### User

Represents a Microsoft 365 user retrieved from Microsoft Graph API.

**C# (.NET Backend)**:
```csharp
/// <summary>
/// User entity based on Microsoft Graph API User resource
/// </summary>
public class User
{
    /// <summary>Unique identifier for the user (GUID format)</summary>
    public string Id { get; set; } = string.Empty;
    
    /// <summary>User's display name (full name)</summary>
    public string DisplayName { get; set; } = string.Empty;
    
    /// <summary>User's given name (first name)</summary>
    public string? GivenName { get; set; }
    
    /// <summary>User's surname (last name)</summary>
    public string? Surname { get; set; }
    
    /// <summary>Primary email address</summary>
    public string Mail { get; set; } = string.Empty;
    
    /// <summary>User's job title</summary>
    public string JobTitle { get; set; } = string.Empty;
    
    /// <summary>Department name</summary>
    public string Department { get; set; } = string.Empty;
    
    /// <summary>Physical office location</summary>
    public string? OfficeLocation { get; set; }
    
    /// <summary>User's business phone numbers</summary>
    public List<string>? BusinessPhones { get; set; }
    
    /// <summary>AI-generated summary (from Semantic Kernel)</summary>
    public string? Summary { get; set; }
}
```

**TypeScript (React Frontend)**:
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
  
  /** AI-generated summary (from .NET agent) */
  summary?: string;
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

## Streaming Response Wrapper

### StreamResponse<T>

Wrapper for streaming data chunks from .NET backend to React frontend.

**C# (.NET Backend)**:
```csharp
/// <summary>
/// Streaming response wrapper for real-time data delivery
/// </summary>
public class StreamResponse<T>
{
    /// <summary>Data payload for this chunk</summary>
    public T? Data { get; set; }
    
    /// <summary>Whether this is the final chunk</summary>
    public bool IsComplete { get; set; }
    
    /// <summary>Error message if chunk delivery failed</summary>
    public string? Error { get; set; }
    
    /// <summary>Sequential chunk index (0-based)</summary>
    public int ChunkIndex { get; set; }
    
    /// <summary>Total number of chunks (if known)</summary>
    public int? TotalChunks { get; set; }
    
    /// <summary>Timestamp when chunk was sent</summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
```

**TypeScript (React Frontend)**:
```typescript
/**
 * Streaming response wrapper for real-time data delivery from .NET backend
 */
interface StreamResponse<T> {
  /** Data payload for this chunk */
  data: T | null;
  
  /** Whether this is the final chunk in the stream */
  isComplete: boolean;
  
  /** Error message if chunk delivery failed */
  error: string | null;
  
  /** Sequential chunk index (0-based) */
  chunkIndex: number;
  
  /** Total number of chunks (if known, null if unknown) */
  totalChunks: number | null;
  
  /** Timestamp when chunk was sent (ISO 8601 format) */
  timestamp: string;
}
```

**Usage Example**:
```typescript
// Frontend receiving streamed users
connection.on("ReceiveUserChunk", (response: StreamResponse<User>) => {
  if (response.error) {
    setError(response.error);
    return;
  }
  
  if (response.data) {
    setUsers(prev => [...prev, response.data!]);
  }
  
  if (response.isComplete) {
    setIsStreaming(false);
  }
});
```

## API Response Wrapper

### ApiResponse<T>

Generic wrapper for non-streaming API responses to provide consistent state management.

```typescript
/**
 * Generic API response wrapper with loading and error states
 * Used by hooks to manage async operations (non-streaming)
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

### IGraphAgent (.NET Backend)

Interface defining the contract for .NET Microsoft Graph API agent using Semantic Kernel.

**C# (.NET Backend)**:
```csharp
/// <summary>
/// Graph API Agent Interface using Microsoft Semantic Kernel
/// Defines methods for extracting, summarizing, and streaming Graph API data
/// </summary>
public interface IGraphAgent
{
    /// <summary>
    /// Stream all users with AI summarization
    /// </summary>
    /// <returns>Async enumerable of users with summaries</returns>
    IAsyncEnumerable<User> StreamUsersAsync(CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Stream all projects with AI summarization
    /// </summary>
    /// <returns>Async enumerable of projects with summaries</returns>
    IAsyncEnumerable<Project> StreamProjectsAsync(CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Get a single user by ID (non-streaming)
    /// </summary>
    /// <param name="id">User GUID</param>
    /// <returns>User or null if not found</returns>
    Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Get a single project by ID (non-streaming)
    /// </summary>
    /// <param name="id">Project GUID</param>
    /// <returns>Project or null if not found</returns>
    Task<Project?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Enable or disable mock mode
    /// </summary>
    /// <param name="enabled">Whether to use mock data</param>
    void SetMockMode(bool enabled);
}
```

### SignalR Hub Interface

Interface for real-time streaming hub.

**C# (.NET Backend)**:
```csharp
/// <summary>
/// SignalR hub for streaming Graph data to React frontend
/// </summary>
public interface IGraphDataHub
{
    /// <summary>
    /// Start streaming users to the connected client
    /// </summary>
    Task StreamUsers();
    
    /// <summary>
    /// Start streaming projects to the connected client
    /// </summary>
    Task StreamProjects();
    
    /// <summary>
    /// Stop current streaming operation
    /// </summary>
    Task StopStreaming();
}
```

**TypeScript (React Frontend - SignalR Service)**:
```typescript
/**
 * SignalR service for connecting to .NET backend streaming hub
 */
interface ISignalRService {
  /**
   * Connect to SignalR hub
   * @returns Promise that resolves when connected
   */
  connect(): Promise<void>;
  
  /**
   * Disconnect from SignalR hub
   * @returns Promise that resolves when disconnected
   */
  disconnect(): Promise<void>;
  
  /**
   * Register callback for receiving user chunks
   * @param callback Function to call when user chunk arrives
   */
  onUserReceived(callback: (response: StreamResponse<User>) => void): void;
  
  /**
   * Register callback for receiving project chunks
   * @param callback Function to call when project chunk arrives
   */
  onProjectReceived(callback: (response: StreamResponse<Project>) => void): void;
  
  /**
   * Register callback for stream completion
   * @param callback Function to call when stream completes
   */
  onStreamComplete(callback: () => void): void;
  
  /**
   * Register callback for stream errors
   * @param callback Function to call when error occurs
   */
  onStreamError(callback: (error: string) => void): void;
  
  /**
   * Request backend to start streaming users
   * @returns Promise that resolves when stream starts
   */
  startStreamingUsers(): Promise<void>;
  
  /**
   * Request backend to start streaming projects
   * @returns Promise that resolves when stream starts
   */
  startStreamingProjects(): Promise<void>;
  
  /**
   * Request backend to stop current stream
   * @returns Promise that resolves when stream stops
   */
  stopStreaming(): Promise<void>;
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

/**
 * Props for AG-UI streaming list component
 */
interface AGStreamingListProps<T> {
  /** Items currently received from stream */
  items: T[];
  
  /** Whether stream is currently active */
  isStreaming: boolean;
  
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  
  /** Optional loading message */
  loadingMessage?: string;
  
  /** Optional completion message */
  completionMessage?: string;
  
  /** Show progress indicator */
  showProgress?: boolean;
  
  /** Total items expected (if known) */
  totalItems?: number;
}

/**
 * Props for streaming progress indicator
 */
interface StreamingProgressProps {
  /** Current count of items received */
  current: number;
  
  /** Total items expected (null if unknown) */
  total: number | null;
  
  /** Whether streaming is active */
  isActive: boolean;
  
  /** Custom message to display */
  message?: string;
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
  /** Whether this card is being rendered during streaming */
  isStreaming?: boolean;
}

/**
 * Props for UserList component (streaming-enabled)
 */
interface UserListProps {
  users: User[];
  isStreaming?: boolean;
  error?: string | null;
  onUserClick?: (user: User) => void;
  onRefresh?: () => void;
  /** Show streaming progress */
  showProgress?: boolean;
}

/**
 * Props for ProjectCard component
 */
interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  /** Whether this card is being rendered during streaming */
  isStreaming?: boolean;
}

/**
 * Props for ProjectList component (streaming-enabled)
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

### useStreamingData Hook

```typescript
/**
 * Return type for useStreamingData hook (replaces useGraphAgent)
 */
interface UseStreamingDataResult {
  /** Current list of users received from stream */
  users: User[];
  
  /** Current list of projects received from stream */
  projects: Project[];
  
  /** Whether stream is currently active */
  isStreaming: boolean;
  
  /** Error message from the most recent failed stream */
  error: string | null;
  
  /** Function to start streaming users */
  streamUsers: () => Promise<void>;
  
  /** Function to start streaming projects */
  streamProjects: () => Promise<void>;
  
  /** Function to stop current stream */
  stopStreaming: () => Promise<void>;
  
  /** Progress info: current count and total if known */
  progress: {
    current: number;
    total: number | null;
  };
}
```

### useSignalR Hook

```typescript
/**
 * Return type for useSignalR hook
 */
interface UseSignalRResult {
  /** Whether SignalR is connected */
  isConnected: boolean;
  
  /** Connection error if any */
  connectionError: string | null;
  
  /** Connect to SignalR hub */
  connect: () => Promise<void>;
  
  /** Disconnect from SignalR hub */
  disconnect: () => Promise<void>;
  
  /** Underlying SignalR service instance */
  service: ISignalRService | null;
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
