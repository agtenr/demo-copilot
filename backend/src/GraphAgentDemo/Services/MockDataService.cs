using GraphAgentDemo.Models;

namespace GraphAgentDemo.Services;

/// <summary>
/// Mock data service providing sample users and projects
/// Matches data structure from Microsoft Graph API
/// </summary>
public class MockDataService
{
    private readonly List<User> _mockUsers;
    private readonly List<Project> _mockProjects;

    public MockDataService()
    {
        _mockUsers = new List<User>
        {
            new User
            {
                Id = "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
                DisplayName = "Adele Vance",
                GivenName = "Adele",
                Surname = "Vance",
                Mail = "adelev@contoso.com",
                JobTitle = "Product Marketing Manager",
                Department = "Sales & Marketing",
                OfficeLocation = "18/2111",
                BusinessPhones = new List<string> { "+1 425 555 0100" }
            },
            new User
            {
                Id = "6e7b768e-07e2-4810-8459-485f84f8f204",
                DisplayName = "Megan Bowen",
                GivenName = "Megan",
                Surname = "Bowen",
                Mail = "meganb@contoso.com",
                JobTitle = "Auditor",
                Department = "Finance",
                OfficeLocation = "12/1110",
                BusinessPhones = new List<string> { "+1 425 555 0109" }
            },
            new User
            {
                Id = "2d3d2640-20c3-4c4b-8c7a-4b6b8e4c0f9a",
                DisplayName = "Alex Wilber",
                GivenName = "Alex",
                Surname = "Wilber",
                Mail = "alexw@contoso.com",
                JobTitle = "Software Engineer",
                Department = "Engineering",
                OfficeLocation = "20/1101",
                BusinessPhones = new List<string> { "+1 425 555 0130" }
            },
            new User
            {
                Id = "1f1f1f1f-2e2e-3d3d-4c4c-5b5b5b5b5b5b",
                DisplayName = "Isaiah Langer",
                GivenName = "Isaiah",
                Surname = "Langer",
                Mail = "isaiahl@contoso.com",
                JobTitle = "Director of Product",
                Department = "Product",
                OfficeLocation = "18/2109",
                BusinessPhones = new List<string> { "+1 425 555 0140" }
            },
            new User
            {
                Id = "9a9a9a9a-8b8b-7c7c-6d6d-5e5e5e5e5e5e",
                DisplayName = "Lynne Robbins",
                GivenName = "Lynne",
                Surname = "Robbins",
                Mail = "lynner@contoso.com",
                JobTitle = "HR Manager",
                Department = "Human Resources",
                OfficeLocation = "15/1105",
                BusinessPhones = new List<string> { "+1 425 555 0150" }
            }
        };

        _mockProjects = new List<Project>
        {
            new Project
            {
                Id = "b320ee12-b1cd-4cca-b648-a437be61c5cd",
                Name = "Marketing Campaign 2024",
                Description = "Q1 product launch marketing campaign",
                Status = "active",
                Owner = _mockUsers[0],
                CreatedDate = "2024-01-15T12:00:00Z",
                MemberCount = 8,
                Mail = "marketing2024@contoso.com"
            },
            new Project
            {
                Id = "45b7d2e9-866f-4a2d-a524-fe0f10c94a34",
                Name = "Website Redesign",
                Description = "Complete overhaul of company website with modern design",
                Status = "on-hold",
                Owner = _mockUsers[2],
                CreatedDate = "2024-02-20T14:30:00Z",
                MemberCount = 5
            },
            new Project
            {
                Id = "c9c9c9c9-8d8d-7a7a-6b6b-5c5c5c5c5c5c",
                Name = "Financial Audit Q4 2023",
                Description = "Annual financial audit and compliance review",
                Status = "completed",
                Owner = _mockUsers[1],
                CreatedDate = "2023-10-01T09:00:00Z",
                MemberCount = 3
            }
        };
    }

    public List<User> GetUsers() => _mockUsers;
    public List<Project> GetProjects() => _mockProjects;
}
