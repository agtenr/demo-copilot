using GraphAgentDemo.Agents;
using GraphAgentDemo.Models;
using Microsoft.AspNetCore.SignalR;

namespace GraphAgentDemo.Hubs;

/// <summary>
/// SignalR Hub for streaming Graph API data to React frontend
/// Implements AG-UI Protocol for real-time communication
/// </summary>
public class GraphDataHub : Hub
{
    private readonly IGraphAgent _graphAgent;
    private readonly ILogger<GraphDataHub> _logger;

    public GraphDataHub(IGraphAgent graphAgent, ILogger<GraphDataHub> logger)
    {
        _graphAgent = graphAgent;
        _logger = logger;
    }

    /// <summary>
    /// Stream users to the connected client
    /// Sends data in chunks with progress information
    /// </summary>
    public async Task StreamUsers()
    {
        _logger.LogInformation("Client {ConnectionId} requested user stream", Context.ConnectionId);

        try
        {
            var users = new List<User>();
            var chunkIndex = 0;

            // Collect users to know total count
            await foreach (var user in _graphAgent.StreamUsersAsync(Context.ConnectionAborted))
            {
                users.Add(user);
            }

            var totalChunks = users.Count;

            // Stream each user as a chunk
            foreach (var user in users)
            {
                var response = new StreamResponse<User>
                {
                    Data = user,
                    IsComplete = chunkIndex == totalChunks - 1,
                    Error = null,
                    ChunkIndex = chunkIndex,
                    TotalChunks = totalChunks,
                    Timestamp = DateTime.UtcNow
                };

                await Clients.Caller.SendAsync("ReceiveUserChunk", response, Context.ConnectionAborted);
                
                // Add delay between chunks for visualization
                if (chunkIndex < totalChunks - 1)
                {
                    await Task.Delay(200, Context.ConnectionAborted);
                }
                
                chunkIndex++;
            }

            _logger.LogInformation("User streaming completed for {ConnectionId}", Context.ConnectionId);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("User streaming cancelled for {ConnectionId}", Context.ConnectionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error streaming users for {ConnectionId}", Context.ConnectionId);
            
            var errorResponse = new StreamResponse<User>
            {
                Data = null,
                IsComplete = true,
                Error = "Failed to stream users: " + ex.Message,
                ChunkIndex = 0,
                TotalChunks = 0,
                Timestamp = DateTime.UtcNow
            };
            
            await Clients.Caller.SendAsync("ReceiveUserChunk", errorResponse);
        }
    }

    /// <summary>
    /// Stream projects to the connected client
    /// Sends data in chunks with progress information
    /// </summary>
    public async Task StreamProjects()
    {
        _logger.LogInformation("Client {ConnectionId} requested project stream", Context.ConnectionId);

        try
        {
            var projects = new List<Project>();
            var chunkIndex = 0;

            // Collect projects to know total count
            await foreach (var project in _graphAgent.StreamProjectsAsync(Context.ConnectionAborted))
            {
                projects.Add(project);
            }

            var totalChunks = projects.Count;

            // Stream each project as a chunk
            foreach (var project in projects)
            {
                var response = new StreamResponse<Project>
                {
                    Data = project,
                    IsComplete = chunkIndex == totalChunks - 1,
                    Error = null,
                    ChunkIndex = chunkIndex,
                    TotalChunks = totalChunks,
                    Timestamp = DateTime.UtcNow
                };

                await Clients.Caller.SendAsync("ReceiveProjectChunk", response, Context.ConnectionAborted);
                
                // Add delay between chunks for visualization
                if (chunkIndex < totalChunks - 1)
                {
                    await Task.Delay(200, Context.ConnectionAborted);
                }
                
                chunkIndex++;
            }

            _logger.LogInformation("Project streaming completed for {ConnectionId}", Context.ConnectionId);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Project streaming cancelled for {ConnectionId}", Context.ConnectionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error streaming projects for {ConnectionId}", Context.ConnectionId);
            
            var errorResponse = new StreamResponse<Project>
            {
                Data = null,
                IsComplete = true,
                Error = "Failed to stream projects: " + ex.Message,
                ChunkIndex = 0,
                TotalChunks = 0,
                Timestamp = DateTime.UtcNow
            };
            
            await Clients.Caller.SendAsync("ReceiveProjectChunk", errorResponse);
        }
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation("Client connected: {ConnectionId}", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation("Client disconnected: {ConnectionId}", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}
