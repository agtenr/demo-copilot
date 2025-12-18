# Graph Agent Contract

**Version**: 1.0.0  
**Date**: 2025-12-18  
**Status**: Stable

## Overview

The GraphAgent is responsible for all interactions with Microsoft Graph API. It abstracts the data fetching logic from UI components and provides a consistent interface for retrieving users and projects.

## Interface Definition

```typescript
interface IGraphAgent {
  getUsers(): Promise<User[]>;
  getProjects(): Promise<Project[]>;
  getUserById(id: string): Promise<User | null>;
  getProjectById(id: string): Promise<Project | null>;
  setMockMode(enabled: boolean): void;
}
```

## Methods

### getUsers()

Retrieves all users from Microsoft Graph API.

**Signature**: `getUsers(): Promise<User[]>`

**Parameters**: None

**Returns**: `Promise<User[]>` - Array of User objects

**Behavior**:
- In mock mode: Returns array from `MOCK_USERS` after simulated delay (300ms)
- In real mode: Fetches from `https://graph.microsoft.com/v1.0/users`
- Always validates data structure before returning
- Simulates network delay for realistic testing

**Error Handling**:
- Throws `Error` with message if fetch fails
- Message format: `"Failed to fetch users: <reason>"`
- UI components should catch and display error appropriately

**Example Usage**:
```typescript
try {
  const users = await graphAgent.getUsers();
  console.log(`Retrieved ${users.length} users`);
} catch (error) {
  console.error('Error:', error.message);
}
```

**Example Response**:
```json
[
  {
    "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    "displayName": "Adele Vance",
    "givenName": "Adele",
    "surname": "Vance",
    "mail": "adelev@contoso.com",
    "jobTitle": "Product Marketing Manager",
    "department": "Sales & Marketing",
    "officeLocation": "18/2111"
  }
  // ... more users
]
```

---

### getProjects()

Retrieves all projects from Microsoft Graph API (Groups endpoint).

**Signature**: `getProjects(): Promise<Project[]>`

**Parameters**: None

**Returns**: `Promise<Project[]>` - Array of Project objects

**Behavior**:
- In mock mode: Returns array from `MOCK_PROJECTS` after simulated delay (300ms)
- In real mode: Fetches from `https://graph.microsoft.com/v1.0/groups` and transforms to Project format
- Enriches project data with owner information
- Always validates data structure before returning

**Error Handling**:
- Throws `Error` with message if fetch fails
- Message format: `"Failed to fetch projects: <reason>"`
- UI components should catch and display error appropriately

**Example Usage**:
```typescript
try {
  const projects = await graphAgent.getProjects();
  console.log(`Retrieved ${projects.length} projects`);
} catch (error) {
  console.error('Error:', error.message);
}
```

**Example Response**:
```json
[
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
    "memberCount": 8
  }
  // ... more projects
]
```

---

### getUserById(id)

Retrieves a single user by their unique identifier.

**Signature**: `getUserById(id: string): Promise<User | null>`

**Parameters**:
- `id` (string, required): User GUID in standard format

**Returns**: `Promise<User | null>` - User object if found, null if not found

**Behavior**:
- Searches for user with matching ID
- In mock mode: Searches `MOCK_USERS` array
- In real mode: Fetches from `https://graph.microsoft.com/v1.0/users/{id}`
- Returns `null` if user not found (not an error)

**Error Handling**:
- Throws `Error` if fetch operation fails (network error, invalid response, etc.)
- Returns `null` if user simply doesn't exist (404)
- Message format: `"Failed to fetch user: <reason>"`

**Example Usage**:
```typescript
const userId = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const user = await graphAgent.getUserById(userId);

if (user) {
  console.log(`Found user: ${user.displayName}`);
} else {
  console.log('User not found');
}
```

---

### getProjectById(id)

Retrieves a single project by its unique identifier.

**Signature**: `getProjectById(id: string): Promise<Project | null>`

**Parameters**:
- `id` (string, required): Project GUID in standard format

**Returns**: `Promise<Project | null>` - Project object if found, null if not found

**Behavior**:
- Searches for project with matching ID
- In mock mode: Searches `MOCK_PROJECTS` array
- In real mode: Fetches from `https://graph.microsoft.com/v1.0/groups/{id}`
- Returns `null` if project not found (not an error)

**Error Handling**:
- Throws `Error` if fetch operation fails
- Returns `null` if project simply doesn't exist (404)
- Message format: `"Failed to fetch project: <reason>"`

**Example Usage**:
```typescript
const projectId = "b320ee12-b1cd-4cca-b648-a437be61c5cd";
const project = await graphAgent.getProjectById(projectId);

if (project) {
  console.log(`Found project: ${project.name}`);
} else {
  console.log('Project not found');
}
```

---

### setMockMode(enabled)

Toggles between mock mode and real API mode.

**Signature**: `setMockMode(enabled: boolean): void`

**Parameters**:
- `enabled` (boolean, required): `true` for mock mode, `false` for real API

**Returns**: `void` - No return value

**Behavior**:
- Immediately switches mode
- Does not affect in-flight requests
- Default mode is `true` (mock enabled)
- No side effects beyond mode change

**Example Usage**:
```typescript
// Use mock data (default)
graphAgent.setMockMode(true);

// Use real Microsoft Graph API
graphAgent.setMockMode(false);
```

## Implementation Notes

### Agent Pattern Principles

1. **Single Responsibility**: Agent only handles Graph API interactions
2. **Encapsulation**: Internal implementation details are hidden
3. **Testability**: Easy to mock or stub for testing
4. **Error Handling**: Consistent error reporting
5. **Type Safety**: Full TypeScript support

### Mock Mode Implementation

```typescript
class GraphAgent implements IGraphAgent {
  private mockMode: boolean = true;

  async getUsers(): Promise<User[]> {
    // Simulate realistic API delay
    await this.delay(300);
    
    if (this.mockMode) {
      return [...MOCK_USERS]; // Return copy to prevent mutations
    }
    
    // Real API call would go here
    throw new Error('Real API mode not implemented');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setMockMode(enabled: boolean): void {
    this.mockMode = enabled;
  }
}

// Singleton instance
export const graphAgent = new GraphAgent();
```

### Network Delay Simulation

Mock mode includes a 300ms delay to simulate real network latency. This ensures:
- Loading states are visible during development
- UI transitions can be tested
- Realistic user experience in demos

### Data Validation

Agent should validate all data before returning:

```typescript
private validateUsers(data: any): User[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid response: expected array');
  }
  
  return data.filter(isValidUser);
}
```

## Error Scenarios

| Scenario | Mock Mode Behavior | Real Mode Behavior |
|----------|-------------------|-------------------|
| Network timeout | N/A (no network) | Throw error after timeout |
| Invalid response | Validate and filter | Validate and filter |
| Authentication failure | N/A (no auth) | Throw auth error |
| Rate limiting | N/A | Throw rate limit error |
| Server error (5xx) | N/A | Throw server error |
| Not found (404) | Return null for byId | Return null for byId |

## Future Enhancements

1. **Caching**: Add in-memory cache to reduce API calls
2. **Pagination**: Support paginated responses for large datasets
3. **Filtering**: Add parameters to filter users/projects
4. **Sorting**: Add parameters to sort results
5. **Real-time Updates**: WebSocket or polling for live data
6. **Retry Logic**: Automatic retry for transient failures
7. **Request Cancellation**: Support for aborting in-flight requests

## Testing Guidelines

### Unit Tests

```typescript
describe('GraphAgent', () => {
  beforeEach(() => {
    graphAgent.setMockMode(true);
  });

  it('should return mock users in mock mode', async () => {
    const users = await graphAgent.getUsers();
    expect(users).toHaveLength(5);
    expect(users[0]).toHaveProperty('displayName');
  });

  it('should return null for non-existent user', async () => {
    const user = await graphAgent.getUserById('non-existent-id');
    expect(user).toBeNull();
  });

  it('should throw error on fetch failure', async () => {
    // Mock fetch to fail
    await expect(graphAgent.getUsers()).rejects.toThrow();
  });
});
```

## Version History

- **1.0.0** (2025-12-18): Initial version with mock mode support
- Future: Real API mode implementation
- Future: Caching and pagination support
