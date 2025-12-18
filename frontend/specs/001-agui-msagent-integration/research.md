# Research: AG-UI & Microsoft Agent Framework Integration

**Feature**: AG-UI & Microsoft Agent Framework Integration  
**Phase**: 0 - Research & Technology Selection  
**Date**: 2025-12-18  
**Status**: Complete

## Overview

This document captures the research findings for implementing a demo application that integrates AG-UI and Microsoft Agent Framework with a mock Microsoft Graph API. The goal is to make technology decisions that keep the demo simple, educational, and accessible to novice developers.

## Research Topics

### 1. AG-UI Component Library

**Decision**: Use a custom lightweight wrapper around native HTML/CSS with Radix UI primitives as needed

**Rationale**: 
- AG-UI does not appear to be a publicly available npm package
- Rather than add heavy dependencies, create minimal "AG-UI-style" components that demonstrate the pattern
- This approach is more educational - developers can see exactly how UI components are structured
- Keeps bundle size small and dependencies minimal
- Can easily be replaced with actual AG-UI if it becomes available

**Alternatives Considered**:
1. **Shadcn UI** - Modern, accessible, customizable. PRO: Great DX, well-documented. CON: Requires setup and might be overkill for a simple demo
2. **Material-UI (MUI)** - Comprehensive component library. PRO: Production-ready, widely used. CON: Heavy bundle size, steeper learning curve
3. **Chakra UI** - Simple, accessible. PRO: Easy to use, good DX. CON: Another dependency to learn
4. **Radix UI** - Headless UI primitives. PRO: Accessible, composable. CON: Requires custom styling

**Implementation Approach**:
```typescript
// Simple wrapper pattern that can be adapted
// frontend/src/components/agui/Card.tsx
export const AGCard = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`ag-card ${className}`}>
      {children}
    </div>
  );
};
```

**Key Components to Implement**:
- `AGCard` - Container with shadow and border
- `AGButton` - Styled button with variants (primary, secondary)
- `AGList` - List container component
- `AGListItem` - Individual list item
- `AGSpinner` - Loading spinner
- `AGError` - Error message display

### 2. Microsoft Agent Framework

**Decision**: Implement using Microsoft Semantic Kernel in .NET 8+ as the backend agent framework

**Rationale**:
- Microsoft Semantic Kernel is the official Microsoft agent framework for .NET
- Provides built-in support for AI orchestration, plugins, and memory
- Perfect for demonstrating enterprise-grade agent patterns
- Well-documented with extensive examples
- Integrates naturally with Microsoft Graph API
- Supports streaming responses out of the box
- Production-ready framework used in real Microsoft products

**Alternatives Considered**:
1. **TypeScript/JavaScript implementation** - PRO: Single language stack. CON: Doesn't demonstrate real Microsoft Agent Framework, misses .NET ecosystem integration
2. **LangChain with Python** - PRO: Popular framework. CON: Not Microsoft-specific, different ecosystem
3. **Custom .NET implementation** - PRO: Full control. CON: Reinventing the wheel, misses educational value of using real framework

**Agent Implementation Design**:
```csharp
// backend/src/GraphAgentDemo/Agents/GraphAgent.cs
public class GraphAgent : IGraphAgent
{
    private readonly IKernel _kernel;
    private readonly IGraphService _graphService;
    
    public GraphAgent(IKernel kernel, IGraphService graphService)
    {
        _kernel = kernel;
        _graphService = graphService;
    }
    
    public async IAsyncEnumerable<User> StreamUsersAsync()
    {
        // Extract users from Graph API
        var users = await _graphService.GetUsersAsync();
        
        // Summarize using Semantic Kernel
        foreach (var user in users)
        {
            var summarized = await SummarizeUserAsync(user);
            yield return summarized;
            
            // Add delay for realistic streaming
            await Task.Delay(100);
        }
    }
    
    private async Task<User> SummarizeUserAsync(User user)
    {
        // Use Semantic Kernel to summarize/enrich user data
        var prompt = $"Summarize this user profile: {user.DisplayName}, {user.JobTitle}";
        var result = await _kernel.RunAsync(prompt);
        
        user.Summary = result.ToString();
        return user;
    }
}
```

**Streaming Implementation**:
```csharp
// backend/src/GraphAgentDemo/Hubs/GraphDataHub.cs
public class GraphDataHub : Hub
{
    private readonly IGraphAgent _agent;
    
    public async Task StreamUsers()
    {
        await foreach (var user in _agent.StreamUsersAsync())
        {
            await Clients.Caller.SendAsync("ReceiveUser", user);
        }
        
        await Clients.Caller.SendAsync("StreamComplete");
    }
}
```

**Frontend SignalR Integration**:
```typescript
// frontend/src/services/signalrService.ts
import * as signalR from "@microsoft/signalr";

export class SignalRService {
  private connection: signalR.HubConnection;
  
  async connect(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/graphDataHub")
      .withAutomaticReconnect()
      .build();
    
    await this.connection.start();
  }
  
  onUserReceived(callback: (user: User) => void): void {
    this.connection.on("ReceiveUser", callback);
  }
  
  async startStreamingUsers(): Promise<void> {
    await this.connection.invoke("StreamUsers");
  }
}
```

**Agent Framework Principles Applied**:
- **Orchestration**: Semantic Kernel manages the workflow
- **Streaming**: Real-time data delivery via SignalR
- **Summarization**: Agent enriches/summarizes raw Graph data
- **Separation**: .NET backend handles agent logic, React frontend handles display
- **Mockability**: Can toggle between real Graph API and mock data

### 3. Microsoft Graph API Schema Research

**Decision**: Use Microsoft Graph API v1.0 schema for User and Group (as Project proxy)

**Rationale**:
- Microsoft Graph API is well-documented at https://learn.microsoft.com/en-us/graph/api/overview
- User endpoint: `/v1.0/users` - returns user profile information
- Group endpoint: `/v1.0/groups` - can represent projects/teams
- Using actual schema ensures mock data is realistic and educational

**User Schema** (subset for demo):
```json
{
  "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  "displayName": "Adele Vance",
  "givenName": "Adele",
  "surname": "Vance",
  "mail": "adelev@contoso.com",
  "jobTitle": "Product Marketing Manager",
  "officeLocation": "18/2111",
  "department": "Sales & Marketing"
}
```

**Group Schema** (subset for demo, used as Project):
```json
{
  "id": "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  "displayName": "Marketing Campaign 2024",
  "description": "Q1 product launch marketing campaign",
  "createdDateTime": "2024-01-15T12:00:00Z",
  "mail": "marketing2024@contoso.com",
  "mailEnabled": true,
  "mailNickname": "marketing2024"
}
```

**Mock Data Strategy**:
- Create 5 realistic mock users with varied roles and departments
- Create 3 realistic mock projects/groups with different statuses
- Add TypeScript interfaces matching Graph API schema
- Store in `frontend/src/agents/mockData.ts`

**Reference Documentation**:
- User resource type: https://learn.microsoft.com/en-us/graph/api/resources/user
- Group resource type: https://learn.microsoft.com/en-us/graph/api/resources/group
- Example queries and responses provided in Microsoft Graph Explorer

### 4. Testing Strategy

**Decision**: Use Vitest with React Testing Library for component and integration testing

**Rationale**:
- Vitest is faster than Jest and better integrated with Vite
- React Testing Library encourages testing user behavior rather than implementation
- Both are industry standards and educational for novice developers
- Minimal configuration needed with Vite

**Alternatives Considered**:
1. **Jest** - Most popular. PRO: Widely used, lots of resources. CON: Slower, requires more config with Vite
2. **No testing** - Skip tests entirely. PRO: Faster to implement. CON: Not a complete demo, misses educational opportunity
3. **Cypress/Playwright** - E2E testing. PRO: Full user journey testing. CON: Overkill for this demo, slower

**Testing Approach**:
```typescript
// Example test structure
describe('GraphAgent', () => {
  it('should return mock users', async () => {
    const users = await graphAgent.getUsers();
    expect(users).toHaveLength(5);
    expect(users[0]).toHaveProperty('displayName');
  });

  it('should handle errors gracefully', async () => {
    // Test error handling
  });
});

describe('UserList', () => {
  it('should display users when loaded', async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Adele Vance')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    render(<UserList />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

**Test Coverage Goals**:
- GraphAgent: 100% (critical path)
- React Hooks: 90%
- Components: 80% (focus on user-facing behavior)
- Integration: Key user flows (view users, view projects)

**Testing Dependencies**:
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^23.0.0"
  }
}
```

### 5. State Management & Real-time Updates

**Decision**: Use React hooks (useState, useEffect) with SignalR for real-time streaming updates

**Rationale**:
- Built-in React hooks are sufficient for local state management
- SignalR provides real-time bidirectional communication
- Custom hooks encapsulate streaming logic
- No additional state management library needed
- Real-time updates feel more responsive and modern

**Alternatives Considered**:
1. **Redux Toolkit** - PRO: Industry standard, powerful. CON: Boilerplate, overkill for demo
2. **Zustand** - PRO: Simple, minimal. CON: Another dependency to learn
3. **Server-Sent Events (SSE)** - PRO: Simpler than SignalR. CON: One-way only, less flexible

**Custom Hook Pattern for Streaming**:
```typescript
// frontend/src/hooks/useStreamingData.ts
export function useStreamingData() {
  const [users, setUsers] = useState<User[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signalRService = useSignalR();

  const streamUsers = async () => {
    setIsStreaming(true);
    setError(null);
    setUsers([]); // Clear existing
    
    signalRService.onUserReceived((user: User) => {
      setUsers(prev => [...prev, user]); // Add user as it streams
    });
    
    signalRService.onStreamComplete(() => {
      setIsStreaming(false);
    });
    
    try {
      await signalRService.startStreamingUsers();
    } catch (err) {
      setError(err.message);
      setIsStreaming(false);
    }
  };

  return { users, isStreaming, error, streamUsers };
}
```

### 6. Routing

**Decision**: Use React Router v6 for client-side navigation

**Rationale**:
- Industry standard for React routing
- Simple setup for a few routes
- Provides navigation hooks that are educational
- Supports future expansion if needed

**Route Structure**:
```
/ → HomePage (landing page with navigation)
/users → UsersPage (displays user list)
/projects → ProjectsPage (displays project list)
```

### 7. Styling Approach

**Decision**: CSS Modules with utility classes for the AG-UI components

**Rationale**:
- CSS Modules provide scoped styling (comes with Vite)
- Avoids heavy CSS-in-JS libraries
- Easy to understand for beginners
- Can use simple CSS variables for theming

**Alternative Considered**:
1. **Tailwind CSS** - PRO: Utility-first, fast development. CON: Another build step, large learning curve
2. **Styled Components** - PRO: CSS-in-JS, popular. CON: Runtime cost, adds complexity
3. **Plain CSS** - PRO: No dependencies. CON: No scoping, can have naming conflicts

**Styling Pattern**:
```css
/* Card.module.css */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## Technology Stack Summary

**Backend Technologies**:
- .NET 8 SDK
- Microsoft.SemanticKernel (Agent Framework)
- Microsoft.Graph (Graph API SDK)
- Microsoft.AspNetCore.SignalR (Real-time streaming)
- xUnit (Testing framework)

**Frontend Technologies** (already in project):
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Node.js 18+

**Frontend To Be Added**:
- @microsoft/signalr: ^8.0.0 (SignalR client)
- react-router-dom: ^6.20.0 (routing)
- vitest: ^1.0.0 (testing framework)
- @testing-library/react: ^14.0.0 (component testing)
- @testing-library/jest-dom: ^6.0.0 (DOM matchers)
- @testing-library/user-event: ^14.0.0 (user interaction simulation)
- jsdom: ^23.0.0 (DOM environment for tests)

**Optional/Future**:
- @radix-ui/react-* (if more complex UI primitives needed)
- MSW (Mock Service Worker) for API mocking in tests

## Implementation Guidelines

### Code Organization Principles
1. **Separation of Concerns**: Backend (.NET agent), frontend (React UI), clear boundaries
2. **Single Responsibility**: Each file/class has one clear purpose
3. **DRY (Don't Repeat Yourself)**: Shared logic in services/hooks
4. **Explicit Over Implicit**: Clear naming, no magic strings
5. **Type Safety**: Use TypeScript and C# for all data structures

### Naming Conventions
**Backend (C#)**:
- Classes: PascalCase (GraphAgent, GraphDataHub)
- Interfaces: IPascalCase (IGraphAgent, IGraphService)
- Methods: PascalCase (StreamUsersAsync, GetProjectsAsync)
- Files: Match class name (GraphAgent.cs)

**Frontend (TypeScript)**:
- Components: PascalCase (UserCard.tsx, AGStreamingList.tsx)
- Hooks: camelCase with "use" prefix (useStreamingData.ts, useSignalR.ts)
- Services: camelCase (signalrService.ts, streamingClient.ts)
- Types/Interfaces: PascalCase (User, Project, StreamResponse)
- CSS Modules: component-name.module.css

### Documentation Requirements
- Every function/component with JSDoc comment
- README with setup instructions
- Inline comments for complex logic
- Type definitions serve as documentation

### Error Handling Pattern
```typescript
try {
  const data = await agent.fetch();
  return { data, error: null };
} catch (error) {
  console.error('Fetch failed:', error);
  return { data: null, error: error.message };
}
```

## Accessibility Considerations
- Semantic HTML elements (nav, main, article)
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast ratios (WCAG AA)

## Performance Targets
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size: < 500KB (gzipped)
- Lighthouse score: > 90

## Security Considerations
- No real API credentials needed (mock mode)
- Type validation for all data
- XSS prevention through React's default escaping
- No eval() or dangerouslySetInnerHTML

## Next Steps

1. ✅ Research complete - all technology decisions made
2. → Proceed to Phase 1: Create data-model.md
3. → Define contracts in contracts/ directory
4. → Write quickstart.md for end users
5. → Generate tasks with /speckit.tasks
6. → Begin implementation

## References

- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/)
- [React Router v6 Documentation](https://reactrouter.com/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
