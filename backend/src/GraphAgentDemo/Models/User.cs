namespace GraphAgentDemo.Models;

/// <summary>
/// User entity based on Microsoft Graph API User resource
/// </summary>
public class User
{
    /// <summary>Unique identifier for the user (GUID format)</summary>
    public string Id { get; set; } = string.Empty;
    
    /// <summary>User's display name (full name)</summary>
    public string DisplayName { get; set; } = string.Empty;
    
    /// <summary>User's given name (first name)</summary>
    public string? GivenName { get; set; }
    
    /// <summary>User's surname (last name)</summary>
    public string? Surname { get; set; }
    
    /// <summary>Primary email address</summary>
    public string Mail { get; set; } = string.Empty;
    
    /// <summary>User's job title</summary>
    public string JobTitle { get; set; } = string.Empty;
    
    /// <summary>Department name</summary>
    public string Department { get; set; } = string.Empty;
    
    /// <summary>Physical office location</summary>
    public string? OfficeLocation { get; set; }
    
    /// <summary>User's business phone numbers</summary>
    public List<string>? BusinessPhones { get; set; }
    
    /// <summary>AI-generated summary (from agent)</summary>
    public string? Summary { get; set; }
}
