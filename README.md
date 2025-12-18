# demo-copilot

A starter project template with React + TypeScript frontend (using Vite), structured to accommodate a .NET backend in the future.

## Project Structure

```
.
├── .github/
│   └── instructions/
│       └── copilot-instructions.md  # Development best practices
├── frontend/          # React + TypeScript application (Vite)
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
└── .gitignore        # Git ignore rules for frontend and backend
```

## Getting Started

### Frontend (React + TypeScript with Vite)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Available Scripts

- `npm run dev` - Runs the app in development mode at [http://localhost:5173](http://localhost:5173)
- `npm run build` - Builds the app for production to the `dist` folder
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Future Backend (.NET)

The project structure is prepared for adding a .NET backend. When ready, the backend can be added as a separate directory at the root level.

## Development Guidelines

Please refer to [.github/instructions/copilot-instructions.md](./.github/instructions/copilot-instructions.md) for best practices when developing for this project. The key principle is to **keep it simple**.