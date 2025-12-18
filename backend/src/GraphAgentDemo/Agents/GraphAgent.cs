using GraphAgentDemo.Models;
using GraphAgentDemo.Services;
using System.Runtime.CompilerServices;

namespace GraphAgentDemo.Agents;

/// <summary>
/// GraphAgent implementing agent pattern for Microsoft Graph API integration
/// Provides streaming data delivery with simulated delays
/// </summary>
public class GraphAgent : IGraphAgent
{
    private readonly MockDataService _mockDataService;
    private readonly ILogger<GraphAgent> _logger;

    public GraphAgent(MockDataService mockDataService, ILogger<GraphAgent> logger)
    {
        _mockDataService = mockDataService;
        _logger = logger;
    }

    /// <summary>
    /// Stream users with progressive delivery
    /// Simulates chunked streaming with delays between items
    /// </summary>
    public async IAsyncEnumerable<User> StreamUsersAsync([EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting user streaming");
        
        var users = _mockDataService.GetUsers();
        
        foreach (var user in users)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                _logger.LogInformation("User streaming cancelled");
                yield break;
            }

            // Simulate realistic streaming delay
            await Task.Delay(200, cancellationToken);
            
            _logger.LogDebug("Streaming user: {DisplayName}", user.DisplayName);
            yield return user;
        }
        
        _logger.LogInformation("User streaming completed");
    }

    /// <summary>
    /// Stream projects with progressive delivery
    /// Simulates chunked streaming with delays between items
    /// </summary>
    public async IAsyncEnumerable<Project> StreamProjectsAsync([EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting project streaming");
        
        var projects = _mockDataService.GetProjects();
        
        foreach (var project in projects)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                _logger.LogInformation("Project streaming cancelled");
                yield break;
            }

            // Simulate realistic streaming delay
            await Task.Delay(200, cancellationToken);
            
            _logger.LogDebug("Streaming project: {Name}", project.Name);
            yield return project;
        }
        
        _logger.LogInformation("Project streaming completed");
    }
}
