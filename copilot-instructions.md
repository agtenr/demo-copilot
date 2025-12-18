# Copilot Instructions

## Core Principle: Keep It Simple

When developing for this project, always prioritize simplicity over complexity. Write clear, maintainable code that is easy to understand and modify. Avoid over-engineering solutions.

---

## React Best Practices

### General Principles
- **Keep it simple**: Write straightforward components without unnecessary abstractions
- Use functional components with hooks instead of class components
- Follow the single responsibility principle - one component, one job
- Keep components small and focused (ideally under 200 lines)
- Use TypeScript strictly - avoid `any` types when possible

### Component Structure
- Start with the simplest implementation that works
- Organize files by feature, not by type
- Use clear, descriptive component names (PascalCase)
- Place related components, styles, and tests together
- Extract reusable logic into custom hooks when it makes sense

### State Management
- Use `useState` for simple local state
- Use `useReducer` for complex state logic
- Keep state as close to where it's used as possible
- Lift state only when necessary
- Consider Context API before adding external state management libraries

### Code Style
- Use destructuring for props and state
- Prefer named exports over default exports for better refactoring
- Use arrow functions for component definitions
- Keep JSX clean and readable - extract complex expressions
- Add comments only when the code itself cannot be made clearer

### Performance
- Don't optimize prematurely - profile first
- Use `React.memo()` only when you've identified performance issues
- Use `useMemo` and `useCallback` sparingly - only when needed
- Avoid creating functions inside JSX

### TypeScript Usage
- Define clear interfaces for props and state
- Use type inference where TypeScript can figure it out
- Keep types close to where they're used
- Use unions and enums for fixed sets of values
- Avoid type assertions unless absolutely necessary

### Testing
- Write tests that test behavior, not implementation
- Focus on user interactions and expected outcomes
- Keep tests simple and readable
- Test critical paths and edge cases

---

## .NET Core Best Practices

### General Principles
- **Keep it simple**: Start with the simplest solution that meets requirements
- Follow SOLID principles but don't over-apply them
- Use built-in dependency injection
- Prefer async/await for I/O operations
- Write self-documenting code with clear names

### Project Structure
- Keep a clean separation of concerns
- Use minimal API when appropriate for simple scenarios
- Organize code by feature for larger applications
- Keep controllers thin - move logic to services
- Use standard .NET naming conventions

### API Design
- Follow RESTful conventions
- Use appropriate HTTP verbs and status codes
- Keep endpoints simple and focused
- Use data transfer objects (DTOs) for API contracts
- Implement proper error handling and validation

### Code Style
- Use nullable reference types to avoid null reference exceptions
- Leverage pattern matching for cleaner code
- Use `var` when the type is obvious from the right side
- Keep methods short and focused on a single task
- Use meaningful variable and method names

### Dependency Injection
- Register services at the appropriate lifetime (Transient, Scoped, Singleton)
- Inject only what you need
- Use constructor injection
- Avoid service locator pattern

### Database & Entity Framework
- Use Code First approach with migrations
- Keep DbContext focused and light
- Use async queries for better scalability
- Implement repository pattern only when it adds real value
- Be mindful of N+1 query problems

### Configuration
- Use appsettings.json for configuration
- Leverage the Options pattern for strongly-typed configuration
- Keep secrets out of source control (use User Secrets, environment variables, or Azure Key Vault)
- Use different configuration files for different environments

### Error Handling
- Use try-catch blocks judiciously
- Let exceptions bubble up unless you can handle them meaningfully
- Log errors with appropriate context
- Return meaningful error messages to clients (without exposing internals)

### Security
- Validate all inputs
- Use built-in authentication and authorization
- Protect against common vulnerabilities (SQL injection, XSS, CSRF)
- Keep dependencies updated
- Use HTTPS in production

### Testing
- Write unit tests for business logic
- Use integration tests for API endpoints
- Keep tests isolated and independent
- Use test data builders for complex objects
- Aim for meaningful test coverage, not just high percentages

---

## Frontend-Backend Integration

### API Communication
- Use a dedicated API client service/class
- Handle loading and error states consistently
- Implement proper CORS configuration
- Use environment variables for API endpoints
- Keep API contracts in sync between frontend and backend

### Data Flow
- Keep data transformations simple and explicit
- Validate data on both client and server
- Use consistent naming conventions across the stack
- Handle timezones and date formatting consistently

---

## Development Workflow

### Version Control
- Write clear, concise commit messages
- Keep commits small and focused
- Use feature branches for new work
- Review your own changes before creating a PR

### Code Reviews
- Keep PRs small and focused
- Provide constructive feedback
- Prioritize readability and maintainability
- Look for potential bugs and edge cases

### Documentation
- Write README files for setup and running the project
- Document complex business logic
- Keep API documentation up to date
- Add inline comments only when necessary

---

## Remember: Keep It Simple!

When in doubt, choose the simpler solution. Code that is easy to read, understand, and modify is more valuable than clever code. Build features incrementally and refactor when patterns emerge, not in anticipation of future needs.
