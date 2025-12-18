# Implementation Plan: AG-UI & Microsoft Agent Framework Integration

**Branch**: `001-agui-msagent-integration` | **Date**: 2025-12-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-agui-msagent-integration/spec.md`

**Note**: This implementation plan follows the Spec Kit methodology for building a demonstration application integrating AG-UI and Microsoft Agent Framework.

## Summary

Build a simple, novice-friendly demonstration application that integrates AG-UI (front-end component library) and Microsoft Agent Framework (.NET backend) with real-time streaming of Microsoft Graph API data via AG-UI Protocol. The application consists of a .NET backend agent that extracts and summarizes user and project data, streams it to a React frontend using AG-UI Protocol, and displays it using AG-UI components with progressive rendering. The goal is to provide clear, reusable examples for developers learning how to integrate .NET agents with modern React frontends using AG-UI Protocol.

## Technical Context

**Backend**:
- Language/Version: C# with .NET 8+
- Primary Framework: Microsoft Agent Framework (https://github.com/microsoft/agent-framework)
- Streaming: AG-UI Protocol for real-time communication
- Graph API: Microsoft.Graph SDK (with mock mode)

**Frontend**:
- Language/Version: TypeScript 5.9+, React 19+, Node.js 18+
- Primary Dependencies:
  - AG-UI Protocol client (for connecting to .NET backend)
  - AG-UI components (from https://github.com/ag-ui-protocol/ag-ui)
  - Vite 7+ (already configured)
  - React Router (for navigation between user/project views)

**Storage**: Mock in-memory data (JSON objects) in .NET backend, no persistent storage required  
**Testing**: 
- Backend: xUnit for .NET
- Frontend: Vitest, React Testing Library

**Target Platform**: 
- Backend: Cross-platform (.NET 8+, runs on Windows/Mac/Linux)
- Frontend: Modern web browsers (Chrome, Firefox, Safari), responsive design for desktop and mobile

**Project Type**: Full-stack web application (.NET backend API + React SPA frontend)

**Performance Goals**: 
- Initial page load < 2 seconds
- Stream chunk delivery < 100ms per chunk via AG-UI Protocol
- Smooth 60fps UI interactions during streaming
- Backend agent summarization < 500ms

**Constraints**: 
- Must be simple enough for novice developers to understand
- Zero external API dependencies in mock mode (all mocked in .NET)
- Maximum 10-minute setup time from clone to running both backend and frontend
- All integration points must be clearly documented
- Streaming must work via AG-UI Protocol across modern browsers

**Scale/Scope**: 
- .NET backend: ~5-8 classes, 1 agent, 1 AG-UI Protocol endpoint
- React frontend: ~10 React components
- 2 main views (Users, Projects)
- Mock data for 5+ users, 3+ projects
- ~1500-2000 lines of total application code

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity Principles**:
- ✅ Single project structure (no monorepo complexity)
- ✅ Minimal dependencies (only what's necessary for demo)
- ✅ Clear separation of concerns (UI, Agent, Mock Data)
- ✅ No over-engineering (avoid unnecessary abstractions)

**Educational Value**:
- ✅ Code must be self-documenting with clear comments
- ✅ README must target novice developers
- ✅ Examples must be reusable and applicable to real scenarios

**Quality Gates**:
- TypeScript compilation must succeed with no errors
- ESLint must pass with zero errors
- All components must be responsive
- Mock data must be realistic

## Project Structure

### Documentation (this feature)

```text
specs/001-agui-msagent-integration/
├── spec.md              # Feature specification (created)
├── plan.md              # This file - implementation plan
├── research.md          # Phase 0 output - technical research
├── data-model.md        # Phase 1 output - data structures
├── quickstart.md        # Phase 1 output - getting started guide
└── contracts/           # Phase 1 output - API contracts
    ├── graph-agent.md   # Agent interface contract
    └── api-responses.md # Mock API response schemas
```

### Source Code (repository structure)

```text
.
├── backend/                           # .NET Backend Application
│   ├── src/
│   │   ├── GraphAgentDemo/           # Main .NET project
│   │   │   ├── Agents/               # Microsoft Agent Framework agents
│   │   │   │   ├── GraphAgent.cs     # Main agent using Agent Framework
│   │   │   │   ├── GraphSummarizer.cs # Data summarization logic
│   │   │   │   └── IGraphAgent.cs    # Agent interface
│   │   │   │
│   │   │   ├── Protocol/             # AG-UI Protocol implementation
│   │   │   │   └── AGUIProtocolHandler.cs # AG-UI Protocol handler
│   │   │   │
│   │   │   ├── Models/               # Data models
│   │   │   │   ├── User.cs           # User entity
│   │   │   │   ├── Project.cs        # Project entity
│   │   │   │   └── StreamResponse.cs # Streaming response wrapper
│   │   │   │
│   │   │   ├── Services/             # Business logic services
│   │   │   │   ├── GraphService.cs   # Graph API service
│   │   │   │   └── MockDataService.cs # Mock data provider
│   │   │   │
│   │   │   ├── Program.cs            # Application entry point
│   │   │   └── appsettings.json      # Configuration
│   │   │
│   │   └── GraphAgentDemo.Tests/     # xUnit test project
│   │       ├── AgentTests.cs
│   │       └── SummarizerTests.cs
│   │
│   ├── GraphAgentDemo.sln            # .NET solution file
│   └── README.md                      # Backend setup instructions
│
└── frontend/                          # React Frontend Application
    ├── src/
    │   ├── services/                  # Backend integration services
    │   │   ├── aguiProtocolService.ts # AG-UI Protocol client
    │   │   └── streamingClient.ts    # Streaming data client
    │   │
    │   ├── components/                # React components
    │   │   ├── agui/                 # AG-UI component wrappers
    │   │   │   ├── AGCard.tsx        # AG-UI card wrapper
    │   │   │   ├── AGButton.tsx      # AG-UI button wrapper
    │   │   │   ├── AGStreamingList.tsx # Streaming list component
    │   │   │   ├── LoadingSpinner.tsx # Loading state component
    │   │   │   └── ErrorDisplay.tsx  # Error state component
    │   │   │
    │   │   ├── users/                # User-related components
    │   │   │   ├── UserList.tsx      # List of users (streaming)
    │   │   │   └── UserCard.tsx      # Individual user card
    │   │   │
    │   │   └── projects/             # Project-related components
    │   │       ├── ProjectList.tsx   # List of projects (streaming)
    │   │       └── ProjectCard.tsx   # Individual project card
    │   │
    │   ├── pages/                     # Page components
    │   │   ├── UsersPage.tsx         # Users view page
    │   │   ├── ProjectsPage.tsx      # Projects view page
    │   │   └── HomePage.tsx          # Landing page
    │   │
    │   ├── hooks/                     # Custom React hooks
    │   │   ├── useStreamingData.ts   # Hook for streaming data
    │   │   └── useAGUIProtocol.ts    # Hook for AG-UI Protocol connection
    │   │
    │   ├── types/                     # TypeScript type definitions
    │   │   ├── User.ts               # User entity types
    │   │   ├── Project.ts            # Project entity types
    │   │   └── StreamResponse.ts     # Streaming response types
    │   │
    │   ├── App.tsx                    # Main app component
    │   ├── main.tsx                   # Entry point (existing)
    │   └── App.css                    # Global styles (existing)
    │
    ├── tests/                         # Test files (to be created)
    │   ├── unit/                     # Unit tests
    │   │   ├── services/
    │   │   └── components/
    │   └── integration/              # Integration tests
    │       └── streaming-flow.test.tsx
    │
    └── README.md                      # Frontend setup instructions
```

**Structure Decision**: Full-stack structure with separate backend and frontend projects. The .NET backend implements Microsoft Agent Framework to handle Graph API interactions, data summarization, and real-time streaming via AG-UI Protocol. The React frontend connects to the AG-UI Protocol endpoint and uses AG-UI components to progressively render data as it arrives. This demonstrates proper separation of concerns and realistic architecture patterns while remaining simple enough for educational purposes.

## Complexity Tracking

> **This section is empty as there are no Constitution violations**

All complexity is justified by the educational purpose of the demo:
- Multiple directories organize code by concern (agents, components, pages, types)
- This structure is standard React best practice and aids learning
- No additional abstraction layers beyond what's necessary for the demo

## Phase 0: Research & Technology Selection

### Research Topics

1. **AG-UI Library**
   - Research available AG-UI libraries or modern React UI component libraries
   - If AG-UI is not a public library, determine suitable alternative (e.g., Shadcn UI, Material-UI, or custom styled components)
   - Document component API and usage patterns
   - Identify which components to use: Card, Button, List, etc.

2. **Microsoft Agent Framework**
   - Research if Microsoft Agent Framework is a public library
   - If not available, design a simple agent pattern that follows Microsoft's design principles
   - Document the agent pattern: interface, state management, error handling
   - Ensure pattern is simple enough for novices to understand

3. **Microsoft Graph API Schema**
   - Research actual Microsoft Graph API response schemas for users and projects/groups
   - Document the relevant fields and data structure
   - Create realistic mock data that matches actual API responses

4. **Testing Strategy**
   - Determine testing tools: Vitest vs Jest
   - React Testing Library setup
   - Decide on test coverage expectations for a demo (focus on critical paths)

### Output Artifacts

All research findings will be documented in `research.md` with:
- Decision made
- Rationale for the decision
- Alternatives considered
- Links to documentation and examples

## Phase 1: Design & Contracts

### Data Model (`data-model.md`)

**User Entity**:
```typescript
interface User {
  id: string;                    // Unique identifier (GUID format)
  displayName: string;           // Full name
  email: string;                 // Email address
  jobTitle: string;              // Job title/role
  department: string;            // Department name
  officeLocation?: string;       // Optional office location
}
```

**Project Entity**:
```typescript
interface Project {
  id: string;                    // Unique identifier (GUID format)
  name: string;                  // Project name
  description: string;           // Project description
  status: 'active' | 'completed' | 'on-hold';  // Project status
  owner: User;                   // Project owner (user object)
  createdDate: string;           // ISO date string
  memberCount: number;           // Number of team members
}
```

**ApiResponse Wrapper**:
```typescript
interface ApiResponse<T> {
  data: T | null;                // The actual data or null if error
  loading: boolean;              // Loading state
  error: string | null;          // Error message or null if success
  timestamp: number;             // When response was received
}
```

**GraphAgent Interface**:
```typescript
interface IGraphAgent {
  getUsers(): Promise<User[]>;
  getProjects(): Promise<Project[]>;
  getUserById(id: string): Promise<User | null>;
  getProjectById(id: string): Promise<Project | null>;
}
```

### API Contracts (`contracts/`)

**graph-agent.md**: Documents the GraphAgent class interface, methods, error handling, and mock mode behavior

**api-responses.md**: Documents the expected response format for each agent method, including success and error scenarios

### Quick Start Guide (`quickstart.md`)

Step-by-step instructions for:
1. Prerequisites (Node.js version, npm/yarn)
2. Clone and navigate to repository
3. Install dependencies
4. Run development server
5. View the application in browser
6. Understand the code structure
7. Make simple modifications (change mock data, add a field)

### Agent Context Update

After Phase 1 completion, the agent context will be updated to include:
- Data model documentation
- API contracts
- Project structure overview
- Integration guidelines

This ensures future AI-assisted development has full context of the design decisions.

## Phase 2: Implementation Tasks (Preview)

*Note: Detailed tasks will be generated by `/speckit.tasks` command. High-level overview:*

1. **Setup & Configuration**
   - Add required dependencies (AG-UI alternative, React Router, testing tools)
   - Configure Vitest for testing
   - Update TypeScript configuration if needed

2. **Agent Layer**
   - Implement GraphAgent class
   - Create mock data for users and projects
   - Add TypeScript interfaces
   - Add error handling

3. **React Hooks**
   - Create useGraphAgent hook
   - Create useApiState hook for managing loading/error states

4. **UI Components**
   - Implement common components (Card, Button, LoadingSpinner, ErrorDisplay)
   - Implement UserCard and UserList
   - Implement ProjectCard and ProjectList

5. **Pages**
   - Create HomePage with navigation
   - Create UsersPage
   - Create ProjectsPage

6. **Routing**
   - Set up React Router
   - Configure navigation between pages

7. **Documentation**
   - Update main README with detailed setup instructions
   - Add inline code comments
   - Document integration points

8. **Testing**
   - Add unit tests for GraphAgent
   - Add component tests for critical components
   - Add integration test for user flow

9. **Polish**
   - Responsive design testing
   - Cross-browser testing
   - Performance optimization
   - Final code review

## Dependencies & Installation

**New dependencies to add**:
```json
{
  "dependencies": {
    "react-router-dom": "^6.x",
    "@radix-ui/react-*": "latest" // or chosen UI library
  },
  "devDependencies": {
    "vitest": "^1.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/user-event": "^14.x"
  }
}
```

## Timeline Estimate

- Phase 0 (Research): 1-2 hours
- Phase 1 (Design & Contracts): 2-3 hours  
- Phase 2 (Implementation): 8-12 hours
- Testing & Polish: 2-3 hours

**Total**: 13-20 hours for complete implementation

## Risk Assessment

**Low Risks**:
- AG-UI library might not exist publicly → Mitigation: Use well-known alternative like Radix UI or Shadcn UI
- Microsoft Agent Framework might not be public → Mitigation: Implement simple agent pattern based on Microsoft design principles
- Complexity might be too high for novices → Mitigation: Extensive documentation and comments, incremental complexity

**Success Factors**:
- Keep mock data and agent implementation simple
- Focus on clarity over cleverness
- Provide extensive inline documentation
- Test with actual novice developers if possible

## Next Steps

1. Execute `/speckit.plan` research phase to resolve library availability
2. Complete research.md with all technical decisions
3. Generate data-model.md and contracts
4. Create quickstart.md
5. Execute `/speckit.tasks` to break down into actionable tasks
6. Begin implementation following task sequence
