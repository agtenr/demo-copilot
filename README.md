# demo-copilot

A demonstration application integrating **AG-UI** (frontend component library) and **Microsoft Agent Framework** pattern with mock Microsoft Graph API data, featuring real-time data streaming to a React frontend.

## 📚 Demo Specifications

This repository includes comprehensive specifications built with GitHub Spec Kit:

- **[AG-UI & Microsoft Agent Framework Integration](./frontend/specs/001-agui-msagent-integration/)** - A demonstration application showing how to integrate AG-UI components with Microsoft Agent Framework pattern to fetch and display data from Microsoft Graph API (mock mode).
  - Complete specification with user stories, requirements, and success criteria
  - Technical implementation plan and research
  - Data models and API contracts
  - Quick start guide for novice developers

## ✨ Features

This demo showcases:

- **Real-time Data Streaming**: Simulated AG-UI Protocol streaming with progressive rendering
- **Microsoft Agent Framework Pattern**: Clean separation of concerns with agent-based architecture
- **AG-UI Components**: Custom lightweight UI components following AG-UI principles
- **Microsoft Graph API Integration**: Mock data matching real Microsoft Graph API schema
- **TypeScript**: Full type safety with comprehensive interfaces
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful loading and error states

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/agtenr/demo-copilot.git
   cd demo-copilot
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   ```
   http://localhost:5173
   ```

You should see the demo application home page! 🎉

## 📖 Usage

### Viewing Streamed Users

1. Click **"View Users"** on the home page
2. Watch as users stream in one at a time from the simulated backend
3. Observe the progress indicator showing streaming status
4. Click **"Refresh"** or **"Stream Again"** to restart the stream

### Viewing Streamed Projects

1. Click **"View Projects"** on the home page
2. Watch as projects stream in progressively
3. Each project shows owner information, status, and member count
4. Projects are color-coded by status (active, completed, on-hold)

## 🏗️ Project Structure

```
.
├── frontend/              # React + TypeScript application
│   ├── src/
│   │   ├── types/        # TypeScript interfaces (User, Project, etc.)
│   │   ├── services/     # GraphAgent & AG-UI Protocol services
│   │   ├── hooks/        # Custom React hooks (useStreamingData, etc.)
│   │   ├── components/   # React components
│   │   │   ├── agui/    # AG-UI base components
│   │   │   ├── users/   # User-specific components
│   │   │   └── projects/ # Project-specific components
│   │   ├── pages/       # Page components (Home, Users, Projects)
│   │   └── test/        # Test files
│   ├── specs/           # Feature specifications (Spec Kit)
│   └── package.json     # Frontend dependencies
└── README.md            # This file
```

## 🧪 Available Scripts

### Frontend (React + TypeScript with Vite)

Navigate to the frontend directory first:

```bash
cd frontend
```

Then run any of these commands:

- **`npm run dev`** - Runs the app in development mode at [http://localhost:5173](http://localhost:5173)
- **`npm run build`** - Builds the app for production to the `dist` folder
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality
- **`npm test`** - Run unit tests with Vitest

## 🎯 Key Technologies

**Frontend**:
- React 19 with TypeScript 5.9
- Vite 7 (build tool)
- React Router 7 (routing)
- CSS Modules (scoped styling)
- Vitest (testing)

**Patterns Demonstrated**:
- Microsoft Agent Framework pattern (service layer)
- AG-UI Protocol (simulated streaming)
- Custom React hooks for state management
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