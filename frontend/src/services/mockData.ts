import type { User } from '../types/User';
import type { Project } from '../types/Project';

/**
 * Mock users data based on Microsoft Graph API response format
 * Represents realistic Microsoft 365 user profiles
 */
export const MOCK_USERS: User[] = [
  {
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    displayName: "Adele Vance",
    givenName: "Adele",
    surname: "Vance",
    mail: "adelev@contoso.com",
    jobTitle: "Product Marketing Manager",
    department: "Sales & Marketing",
    officeLocation: "18/2111",
    businessPhones: ["+1 425 555 0100"]
  },
  {
    id: "6e7b768e-07e2-4810-8459-485f84f8f204",
    displayName: "Megan Bowen",
    givenName: "Megan",
    surname: "Bowen",
    mail: "meganb@contoso.com",
    jobTitle: "Auditor",
    department: "Finance",
    officeLocation: "12/1110",
    businessPhones: ["+1 425 555 0109"]
  },
  {
    id: "2d3d2640-20c3-4c4b-8c7a-4b6b8e4c0f9a",
    displayName: "Alex Wilber",
    givenName: "Alex",
    surname: "Wilber",
    mail: "alexw@contoso.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    officeLocation: "20/1101",
    businessPhones: ["+1 425 555 0130"]
  },
  {
    id: "1f1f1f1f-2e2e-3d3d-4c4c-5b5b5b5b5b5b",
    displayName: "Isaiah Langer",
    givenName: "Isaiah",
    surname: "Langer",
    mail: "isaiahl@contoso.com",
    jobTitle: "Director of Product",
    department: "Product",
    officeLocation: "18/2109",
    businessPhones: ["+1 425 555 0140"]
  },
  {
    id: "9a9a9a9a-8b8b-7c7c-6d6d-5e5e5e5e5e5e",
    displayName: "Lynne Robbins",
    givenName: "Lynne",
    surname: "Robbins",
    mail: "lynner@contoso.com",
    jobTitle: "HR Manager",
    department: "Human Resources",
    officeLocation: "15/1105",
    businessPhones: ["+1 425 555 0150"]
  }
];

/**
 * Mock projects data based on Microsoft Graph API Group resource format
 * Represents realistic project/team structures
 */
export const MOCK_PROJECTS: Project[] = [
  {
    id: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
    name: "Marketing Campaign 2024",
    description: "Q1 product launch marketing campaign",
    status: "active",
    owner: {
      id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
      displayName: "Adele Vance",
      mail: "adelev@contoso.com",
      jobTitle: "Product Marketing Manager",
      department: "Sales & Marketing"
    },
    createdDate: "2024-01-15T12:00:00Z",
    memberCount: 8,
    mail: "marketing2024@contoso.com"
  },
  {
    id: "45b7d2e9-866f-4a2d-a524-fe0f10c94a34",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    status: "on-hold",
    owner: {
      id: "2d3d2640-20c3-4c4b-8c7a-4b6b8e4c0f9a",
      displayName: "Alex Wilber",
      mail: "alexw@contoso.com",
      jobTitle: "Software Engineer",
      department: "Engineering"
    },
    createdDate: "2024-02-20T14:30:00Z",
    memberCount: 5
  },
  {
    id: "c9c9c9c9-8d8d-7a7a-6b6b-5c5c5c5c5c5c",
    name: "Financial Audit Q4 2023",
    description: "Annual financial audit and compliance review",
    status: "completed",
    owner: {
      id: "6e7b768e-07e2-4810-8459-485f84f8f204",
      displayName: "Megan Bowen",
      mail: "meganb@contoso.com",
      jobTitle: "Auditor",
      department: "Finance"
    },
    createdDate: "2023-10-01T09:00:00Z",
    memberCount: 3
  }
];
