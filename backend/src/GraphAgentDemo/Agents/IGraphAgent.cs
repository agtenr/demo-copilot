using GraphAgentDemo.Models;

namespace GraphAgentDemo.Agents;

/// <summary>
/// Graph API Agent Interface
/// Defines methods for extracting and streaming Graph API data
/// </summary>
public interface IGraphAgent
{
    /// <summary>
    /// Stream all users with progressive delivery
    /// </summary>
    /// <returns>Async enumerable of users</returns>
    IAsyncEnumerable<User> StreamUsersAsync(CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Stream all projects with progressive delivery
    /// </summary>
    /// <returns>Async enumerable of projects</returns>
    IAsyncEnumerable<Project> StreamProjectsAsync(CancellationToken cancellationToken = default);
}
