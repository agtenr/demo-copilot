namespace GraphAgentDemo.Models;

/// <summary>
/// Project status enum
/// </summary>
public enum ProjectStatus
{
    Active,
    Completed,
    OnHold
}

/// <summary>
/// Project entity (adapted from Microsoft Graph API Group resource)
/// </summary>
public class Project
{
    /// <summary>Unique identifier for the project (GUID format)</summary>
    public string Id { get; set; } = string.Empty;
    
    /// <summary>Project name</summary>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>Detailed project description</summary>
    public string Description { get; set; } = string.Empty;
    
    /// <summary>Current project status</summary>
    public string Status { get; set; } = "active";
    
    /// <summary>Project owner (User reference)</summary>
    public User Owner { get; set; } = new User();
    
    /// <summary>When the project was created (ISO 8601 format)</summary>
    public string CreatedDate { get; set; } = DateTime.UtcNow.ToString("o");
    
    /// <summary>Number of team members</summary>
    public int MemberCount { get; set; }
    
    /// <summary>Project email alias (optional)</summary>
    public string? Mail { get; set; }
}
