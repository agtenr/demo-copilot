# Graph Agent Demo - .NET Backend

.NET 8 backend implementing Microsoft Agent Framework pattern for streaming Microsoft Graph API data to React frontend via SignalR.

## 🚀 Quick Start

### Prerequisites

- **.NET 8 SDK** or higher ([Download here](https://dotnet.microsoft.com/download))
- **Visual Studio 2022** or **VS Code** (optional but recommended)

### Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

3. **Run the application**:
   ```bash
   cd src/GraphAgentDemo
   dotnet run
   ```

The backend will start at: `http://localhost:5000`

### Verify Backend is Running

Open your browser and navigate to:
- Health check: `http://localhost:5000/health`
- Swagger UI: `http://localhost:5000/swagger`

## 🏗️ Architecture

### Agent Pattern

The backend implements the **Microsoft Agent Framework pattern** with:

- **GraphAgent**: Service class implementing `IGraphAgent` interface
- **Mock Mode**: Provides realistic sample data (5 users, 3 projects)
- **Streaming**: Progressive data delivery via SignalR

### SignalR Hub

**GraphDataHub** provides real-time communication:

- `/graphhub` - SignalR endpoint for streaming
- `StreamUsers()` - Streams users in chunks
- `StreamProjects()` - Streams projects in chunks

### Data Flow

```
Frontend (React) 
    ↓ SignalR Connection
GraphDataHub (/graphhub)
    ↓ Calls
GraphAgent (IGraphAgent)
    ↓ Gets data from
MockDataService
    ↓ Returns
User/Project entities
```

## 📁 Project Structure

```
backend/
├── src/
│   └── GraphAgentDemo/
│       ├── Agents/              # Agent pattern implementation
│       │   ├── GraphAgent.cs    # Main agent with streaming logic
│       │   └── IGraphAgent.cs   # Agent interface
│       │
│       ├── Hubs/                # SignalR hubs
│       │   └── GraphDataHub.cs  # Real-time streaming hub
│       │
│       ├── Models/              # Data models
│       │   ├── User.cs          # User entity
│       │   ├── Project.cs       # Project entity
│       │   └── StreamResponse.cs # Streaming wrapper
│       │
│       ├── Services/            # Business services
│       │   └── MockDataService.cs # Mock data provider
│       │
│       ├── Program.cs           # App configuration
│       ├── appsettings.json     # Configuration
│       └── GraphAgentDemo.csproj # Project file
│
├── GraphAgentDemo.sln          # Solution file
└── README.md                    # This file
```

## 🔧 Configuration

### CORS Settings

The backend is configured to accept connections from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React port)

To add more origins, edit `Program.cs`:

```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "YOUR_ORIGIN_HERE")
```

### Logging

Logging is configured in `appsettings.json`:
- Console logging enabled
- SignalR events logged
- Agent operations logged

## 🔌 SignalR Integration

### Connection from Frontend

The React frontend connects via `@microsoft/signalr`:

```typescript
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/graphhub")
  .build();

await connection.start();
```

### Receiving Streamed Data

```typescript
connection.on("ReceiveUserChunk", (response: StreamResponse<User>) => {
  console.log("Received user:", response.data);
  console.log("Progress:", response.chunkIndex + 1, "/", response.totalChunks);
  
  if (response.isComplete) {
    console.log("Stream complete!");
  }
});

await connection.invoke("StreamUsers");
```

## 🧪 Testing

### Manual Testing

1. **Start the backend**:
   ```bash
   dotnet run
   ```

2. **Check health endpoint**:
   ```bash
   curl http://localhost:5000/health
   ```

3. **Test with frontend**:
   - Start the React frontend (see frontend/README.md)
   - Navigate to http://localhost:5173
   - Click "View Users" or "View Projects"

### Testing SignalR Connection

Use browser developer tools:
- Check Network tab for WebSocket connection to `/graphhub`
- Check Console for SignalR connection messages
- Verify streaming messages arrive progressively

## 📊 API Endpoints

### Health Check
```
GET /health
```
Returns backend status and timestamp.

### SignalR Hub
```
WS /graphhub
```
WebSocket endpoint for real-time communication.

**Methods**:
- `StreamUsers()` - Start streaming users
- `StreamProjects()` - Start streaming projects

**Events**:
- `ReceiveUserChunk` - Receive user data chunk
- `ReceiveProjectChunk` - Receive project data chunk

## 🎯 Development

### Building

```bash
dotnet build
```

### Running in Development

```bash
dotnet run --environment Development
```

### Publishing

```bash
dotnet publish -c Release -o ./publish
```

## 🔐 Security Notes

- **CORS**: Currently allows localhost origins for development
- **Mock Data**: Using mock data, no authentication required
- **Production**: Add authentication/authorization before production use

## 📚 Learn More

- [ASP.NET Core SignalR](https://docs.microsoft.com/aspnet/core/signalr)
- [Microsoft Graph API](https://learn.microsoft.com/graph/api/overview)
- [.NET 8 Documentation](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-8)

## 🤝 Integration with Frontend

The backend works seamlessly with the React frontend:

1. Backend runs on port 5000
2. Frontend runs on port 5173
3. SignalR connection established automatically
4. Data streams in real-time with progressive rendering

See `frontend/README.md` for frontend setup instructions.

---

Built with ❤️ using .NET 8 and SignalR
