# demo-copilot

A **full-stack demonstration application** integrating **AG-UI** components and **Microsoft Agent Framework** with a **.NET 8 backend** that streams Microsoft Graph API data in real-time to a React frontend via **SignalR**.

## 📚 Demo Specifications

This repository includes comprehensive specifications built with GitHub Spec Kit:

- **[AG-UI & Microsoft Agent Framework Integration](./frontend/specs/001-agui-msagent-integration/)** - Complete specification for integrating AG-UI components with Microsoft Agent Framework and .NET backend agent.
  - Complete specification with user stories, requirements, and success criteria
  - Technical implementation plan and architecture
  - Data models and API contracts
  - Quick start guide for novice developers

## ✨ Features

This full-stack demo showcases:

- **.NET 8 Backend**: Real Microsoft Agent Framework pattern implementation
- **SignalR Streaming**: Real-time data streaming from .NET to React
- **Microsoft Agent Framework**: Clean agent-based architecture in C#
- **AG-UI Components**: Custom lightweight UI components with streaming support
- **Microsoft Graph API**: Mock data matching real Microsoft Graph API schema
- **Type Safety**: Full TypeScript (frontend) and C# (backend) type coverage
- **Progressive Rendering**: Smooth UI updates as data streams in
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- **.NET 8 SDK** ([Download here](https://dotnet.microsoft.com/download))
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)

### Full-Stack Setup (Both Backend and Frontend)

#### 1. Clone the repository
```bash
git clone https://github.com/agtenr/demo-copilot.git
cd demo-copilot
```

#### 2. Start the .NET Backend (Terminal 1)

```bash
cd backend/src/GraphAgentDemo
dotnet restore
dotnet run
```

Backend will be available at: `http://localhost:5000`

Verify it's running:
```bash
curl http://localhost:5000/health
```

#### 3. Start the React Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

#### 4. Open in Browser

Navigate to: `http://localhost:5173`

You should see the demo application with streaming data! 🎉

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│                  (http://localhost:5173)                    │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Components: UserList, ProjectList                  │  │
│  │  Hooks: useStreamingData, useAGUIProtocol          │  │
│  │  Services: aguiProtocolService (SignalR client)    │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ SignalR WebSocket
                       │ (Real-time bidirectional)
┌──────────────────────▼──────────────────────────────────────┐
│                   .NET 8 Backend                            │
│                (http://localhost:5000)                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  GraphDataHub (SignalR Hub)                        │  │
│  │      ├─ StreamUsers()                              │  │
│  │      └─ StreamProjects()                           │  │
│  │                    ▼                                │  │
│  │  GraphAgent (Microsoft Agent Pattern)              │  │
│  │      └─ Implements IAsyncEnumerable streaming      │  │
│  │                    ▼                                │  │
│  │  MockDataService                                    │  │
│  │      └─ 5 Users, 3 Projects                        │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📖 Usage

### Viewing Streamed Users

1. Click **"View Users"** on the home page
2. Watch as users stream in one at a time from the .NET backend
3. Observe the progress indicator showing streaming status
4. Click **"Refresh"** to restart the stream

### Viewing Streamed Projects

1. Click **"View Projects"** on the home page
2. Watch as projects stream in progressively from SignalR
3. Each project shows owner information, status, and member count
4. Projects are color-coded by status (active, completed, on-hold)

## 🏗️ Project Structure

```
.
├── backend/               # .NET 8 Backend
│   ├── src/
│   │   └── GraphAgentDemo/
│   │       ├── Agents/          # Microsoft Agent Framework implementation
│   │       ├── Hubs/            # SignalR hubs for real-time streaming
│   │       ├── Models/          # C# data models (User, Project, etc.)
│   │       ├── Services/        # Business services (MockDataService)
│   │       └── Program.cs       # ASP.NET Core configuration
│   ├── GraphAgentDemo.sln      # Visual Studio solution
│   └── README.md                # Backend-specific documentation
│
└── frontend/              # React + TypeScript Frontend
    ├── src/
    │   ├── types/        # TypeScript interfaces
    │   ├── services/     # SignalR client & GraphAgent
    │   ├── hooks/        # Custom React hooks
    │   ├── components/   # React components
    │   │   ├── agui/    # AG-UI base components
    │   │   ├── users/   # User-specific components
    │   │   └── projects/ # Project-specific components
    │   ├── pages/       # Page components
    │   └── test/        # Test files
    ├── specs/           # Feature specifications
    └── package.json     # Frontend dependencies
```

## 🧪 Available Scripts

### Backend (.NET 8)

Navigate to the backend directory:

```bash
cd backend/src/GraphAgentDemo
```

Commands:
- **`dotnet run`** - Start the backend server at http://localhost:5000
- **`dotnet build`** - Build the project
- **`dotnet test`** - Run tests (when implemented)

### Frontend (React + TypeScript)

Navigate to the frontend directory:

```bash
cd frontend
```

Commands:
- **`npm run dev`** - Start development server at http://localhost:5173
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm test`** - Run unit tests with Vitest

## 🎯 Key Technologies

**Backend (.NET 8)**:
- ASP.NET Core 8
- SignalR for real-time communication
- Microsoft Agent Framework pattern
- Mock Microsoft Graph API data
- Dependency injection
- Structured logging

**Frontend (React + TypeScript)**:
- React 19 with TypeScript 5.9
- Vite 7 (build tool)
- React Router 7 (routing)
- @microsoft/signalr (SignalR client)
- CSS Modules (scoped styling)
- Vitest (testing)

**Communication**:
- SignalR WebSocket connection
- Real-time bidirectional streaming
- Chunked data delivery with progress tracking
- Component composition and reusability

## 📚 Learning Resources

### For Developers

- **[Quick Start Guide](./frontend/specs/001-agui-msagent-integration/quickstart.md)** - Step-by-step guide for getting started
- **[Feature Specification](./frontend/specs/001-agui-msagent-integration/spec.md)** - Detailed requirements and user stories
- **[Implementation Plan](./frontend/specs/001-agui-msagent-integration/plan.md)** - Technical architecture and approach
- **[Data Models](./frontend/specs/001-agui-msagent-integration/data-model.md)** - TypeScript interfaces and schemas
- **[API Contracts](./frontend/specs/001-agui-msagent-integration/contracts/)** - Agent interface and response formats

### Code Documentation

All code files include:
- JSDoc comments for functions and interfaces
- Inline comments explaining complex logic
- Type definitions serving as documentation

## 🎨 Demo Highlights

### 1. Streaming Visualization

The app demonstrates real-time data streaming with:
- Progressive rendering as data chunks arrive
- Animated transitions for new items
- Progress indicators showing current/total items
- Smooth 60fps UI updates during streaming

### 2. AG-UI Components

Custom components following AG-UI principles:
- **AGCard**: Container with shadow and hover effects
- **AGButton**: Styled button with multiple variants
- **AGStreamingList**: List component with streaming support
- **LoadingSpinner**: Animated loading indicator
- **ErrorDisplay**: User-friendly error messages

### 3. Microsoft Agent Framework Pattern

Clean architecture with:
- **GraphAgent**: Service class encapsulating Graph API logic
- **Mock Mode**: Realistic delays and data simulation
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Graceful failure modes

## 🔧 Development Guidelines

Please refer to [.github/instructions/copilot-instructions.md](./.github/instructions/copilot-instructions.md) for best practices when developing for this project. The key principle is to **keep it simple**.

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and experiment
- Suggest improvements
- Report issues
- Share feedback

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Inspired by [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview)
- Follows [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) patterns
- Specifications created with [GitHub Spec Kit](https://github.com/github/gh-specification)

---

**Made with ❤️ as a demonstration of modern React development practices**