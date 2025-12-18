namespace GraphAgentDemo.Models;

/// <summary>
/// Streaming response wrapper for real-time data delivery
/// </summary>
public class StreamResponse<T>
{
    /// <summary>Data payload for this chunk</summary>
    public T? Data { get; set; }
    
    /// <summary>Whether this is the final chunk</summary>
    public bool IsComplete { get; set; }
    
    /// <summary>Error message if chunk delivery failed</summary>
    public string? Error { get; set; }
    
    /// <summary>Sequential chunk index (0-based)</summary>
    public int ChunkIndex { get; set; }
    
    /// <summary>Total number of chunks (if known)</summary>
    public int? TotalChunks { get; set; }
    
    /// <summary>Timestamp when chunk was sent</summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
