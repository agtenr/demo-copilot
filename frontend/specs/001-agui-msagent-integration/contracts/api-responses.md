# API Response Schemas

**Version**: 1.0.0  
**Date**: 2025-12-18  
**Status**: Stable

## Overview

This document defines the expected response schemas for all GraphAgent methods. All responses follow consistent patterns for success and error cases.

## Response Format Standards

### Success Response

All successful API calls return data directly (unwrapped):

```typescript
// getUsers() success
User[]

// getProjects() success
Project[]

// getUserById() success
User | null

// getProjectById() success
Project | null
```

### Error Response

All errors are thrown as `Error` objects with descriptive messages:

```typescript
try {
  const users = await graphAgent.getUsers();
} catch (error) {
  // error.message contains human-readable error description
  console.error(error.message);
}
```

## User Response Schema

### getUsers() Response

**Type**: `Promise<User[]>`

**Success Response**:
```json
[
  {
    "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    "displayName": "Adele Vance",
    "givenName": "Adele",
    "surname": "Vance",
    "mail": "adelev@contoso.com",
    "jobTitle": "Product Marketing Manager",
    "department": "Sales & Marketing",
    "officeLocation": "18/2111",
    "businessPhones": ["+1 425 555 0100"]
  },
  {
    "id": "6e7b768e-07e2-4810-8459-485f84f8f204",
    "displayName": "Megan Bowen",
    "givenName": "Megan",
    "surname": "Bowen",
    "mail": "meganb@contoso.com",
    "jobTitle": "Auditor",
    "department": "Finance",
    "officeLocation": "12/1110",
    "businessPhones": ["+1 425 555 0109"]
  }
]
```

**Error Response**:
```typescript
throw new Error("Failed to fetch users: Network timeout");
throw new Error("Failed to fetch users: Invalid response format");
throw new Error("Failed to fetch users: Unauthorized");
```

**Empty Response**:
```json
[]
```

### getUserById() Response

**Type**: `Promise<User | null>`

**Success Response (found)**:
```json
{
  "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  "displayName": "Adele Vance",
  "givenName": "Adele",
  "surname": "Vance",
  "mail": "adelev@contoso.com",
  "jobTitle": "Product Marketing Manager",
  "department": "Sales & Marketing",
  "officeLocation": "18/2111"
}
```

**Success Response (not found)**:
```json
null
```

**Error Response**:
```typescript
throw new Error("Failed to fetch user: Network error");
throw new Error("Failed to fetch user: Invalid ID format");
```

## Project Response Schema

### getProjects() Response

**Type**: `Promise<Project[]>`

**Success Response**:
```json
[
  {
    "id": "b320ee12-b1cd-4cca-b648-a437be61c5cd",
    "name": "Marketing Campaign 2024",
    "description": "Q1 product launch marketing campaign",
    "status": "active",
    "owner": {
      "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
      "displayName": "Adele Vance",
      "mail": "adelev@contoso.com",
      "jobTitle": "Product Marketing Manager",
      "department": "Sales & Marketing"
    },
    "createdDate": "2024-01-15T12:00:00Z",
    "memberCount": 8,
    "mail": "marketing2024@contoso.com"
  },
  {
    "id": "45b7d2e9-866f-4a2d-a524-fe0f10c94a34",
    "name": "Website Redesign",
    "description": "Complete overhaul of company website",
    "status": "on-hold",
    "owner": {
      "id": "6e7b768e-07e2-4810-8459-485f84f8f204",
      "displayName": "Megan Bowen",
      "mail": "meganb@contoso.com",
      "jobTitle": "Auditor",
      "department": "Finance"
    },
    "createdDate": "2024-02-20T14:30:00Z",
    "memberCount": 5
  }
]
```

**Error Response**:
```typescript
throw new Error("Failed to fetch projects: Network timeout");
throw new Error("Failed to fetch projects: Invalid response format");
```

**Empty Response**:
```json
[]
```

### getProjectById() Response

**Type**: `Promise<Project | null>`

**Success Response (found)**:
```json
{
  "id": "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  "name": "Marketing Campaign 2024",
  "description": "Q1 product launch marketing campaign",
  "status": "active",
  "owner": {
    "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    "displayName": "Adele Vance",
    "mail": "adelev@contoso.com",
    "jobTitle": "Product Marketing Manager",
    "department": "Sales & Marketing"
  },
  "createdDate": "2024-01-15T12:00:00Z",
  "memberCount": 8
}
```

**Success Response (not found)**:
```json
null
```

**Error Response**:
```typescript
throw new Error("Failed to fetch project: Network error");
throw new Error("Failed to fetch project: Invalid ID format");
```

## Hook Response Wrapper

When using the `useGraphAgent` hook, responses are wrapped in an `ApiResponse<T>` structure:

### ApiResponse<T> Schema

```typescript
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  timestamp: number;
}
```

### Loading State

```json
{
  "data": null,
  "loading": true,
  "error": null,
  "timestamp": 0
}
```

### Success State

```json
{
  "data": [/* array of users or projects */],
  "loading": false,
  "error": null,
  "timestamp": 1702905600000
}
```

### Error State

```json
{
  "data": null,
  "loading": false,
  "error": "Failed to fetch users: Network timeout",
  "timestamp": 1702905600000
}
```

## Field Specifications

### User Fields

| Field | Type | Required | Format/Constraints | Example |
|-------|------|----------|-------------------|---------|
| id | string | Yes | GUID format | "87d349ed-44d7-43e1-9a83-5f2406dee5bd" |
| displayName | string | Yes | 1-256 characters | "Adele Vance" |
| givenName | string | No | 1-128 characters | "Adele" |
| surname | string | No | 1-128 characters | "Vance" |
| mail | string | Yes | Valid email format | "adelev@contoso.com" |
| jobTitle | string | Yes | 1-128 characters | "Product Marketing Manager" |
| department | string | Yes | 1-128 characters | "Sales & Marketing" |
| officeLocation | string | No | 1-128 characters | "18/2111" |
| businessPhones | string[] | No | Array of phone numbers | ["+1 425 555 0100"] |

### Project Fields

| Field | Type | Required | Format/Constraints | Example |
|-------|------|----------|-------------------|---------|
| id | string | Yes | GUID format | "b320ee12-b1cd-4cca-b648-a437be61c5cd" |
| name | string | Yes | 1-256 characters | "Marketing Campaign 2024" |
| description | string | Yes | 1-1024 characters | "Q1 product launch..." |
| status | string | Yes | 'active', 'completed', or 'on-hold' | "active" |
| owner | User | Yes | Valid User object | {...} |
| createdDate | string | Yes | ISO 8601 format | "2024-01-15T12:00:00Z" |
| memberCount | number | Yes | Positive integer | 8 |
| mail | string | No | Valid email format | "marketing2024@contoso.com" |

## Status Codes (for future real API implementation)

| HTTP Status | Meaning | Agent Behavior |
|-------------|---------|----------------|
| 200 OK | Success | Return data |
| 404 Not Found | Resource not found | Return null for byId, empty array for getAll |
| 401 Unauthorized | Authentication failed | Throw error with auth message |
| 403 Forbidden | Insufficient permissions | Throw error with permissions message |
| 429 Too Many Requests | Rate limited | Throw error with retry-after message |
| 500 Server Error | Server-side error | Throw error with generic message |
| 503 Service Unavailable | Service down | Throw error with service unavailable message |

## Error Message Format

All error messages follow this pattern:

```
"Failed to {operation}: {reason}"
```

**Examples**:
- `"Failed to fetch users: Network timeout"`
- `"Failed to fetch user: Invalid ID format"`
- `"Failed to fetch projects: Unauthorized"`
- `"Failed to fetch project: Service unavailable"`

## Validation Rules

### Request Validation

Before making any API call, validate inputs:

```typescript
getUserById(id: string): Promise<User | null> {
  if (!id || typeof id !== 'string') {
    throw new Error('Failed to fetch user: Invalid ID format');
  }
  
  if (!this.isValidGuid(id)) {
    throw new Error('Failed to fetch user: ID must be a valid GUID');
  }
  
  // Proceed with fetch
}
```

### Response Validation

After receiving data, validate structure:

```typescript
async getUsers(): Promise<User[]> {
  const data = await this.fetchData('/users');
  
  if (!Array.isArray(data)) {
    throw new Error('Failed to fetch users: Invalid response format');
  }
  
  // Filter out invalid users
  const validUsers = data.filter(isValidUser);
  
  if (validUsers.length !== data.length) {
    console.warn(`Filtered out ${data.length - validUsers.length} invalid users`);
  }
  
  return validUsers;
}
```

## Mock Data Examples

### Complete Mock Users Array

```json
[
  {
    "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    "displayName": "Adele Vance",
    "givenName": "Adele",
    "surname": "Vance",
    "mail": "adelev@contoso.com",
    "jobTitle": "Product Marketing Manager",
    "department": "Sales & Marketing",
    "officeLocation": "18/2111"
  },
  {
    "id": "6e7b768e-07e2-4810-8459-485f84f8f204",
    "displayName": "Megan Bowen",
    "givenName": "Megan",
    "surname": "Bowen",
    "mail": "meganb@contoso.com",
    "jobTitle": "Auditor",
    "department": "Finance",
    "officeLocation": "12/1110"
  },
  {
    "id": "2d3d2640-20c3-4c4b-8c7a-4b6b8e4c0f9a",
    "displayName": "Alex Wilber",
    "givenName": "Alex",
    "surname": "Wilber",
    "mail": "alexw@contoso.com",
    "jobTitle": "Software Engineer",
    "department": "Engineering",
    "officeLocation": "20/1101"
  },
  {
    "id": "1f1f1f1f-2e2e-3d3d-4c4c-5b5b5b5b5b5b",
    "displayName": "Isaiah Langer",
    "givenName": "Isaiah",
    "surname": "Langer",
    "mail": "isaiahl@contoso.com",
    "jobTitle": "Director of Product",
    "department": "Product",
    "officeLocation": "18/2109"
  },
  {
    "id": "9a9a9a9a-8b8b-7c7c-6d6d-5e5e5e5e5e5e",
    "displayName": "Lynne Robbins",
    "givenName": "Lynne",
    "surname": "Robbins",
    "mail": "lynner@contoso.com",
    "jobTitle": "HR Manager",
    "department": "Human Resources",
    "officeLocation": "15/1105"
  }
]
```

### Complete Mock Projects Array

```json
[
  {
    "id": "b320ee12-b1cd-4cca-b648-a437be61c5cd",
    "name": "Marketing Campaign 2024",
    "description": "Q1 product launch marketing campaign",
    "status": "active",
    "owner": {
      "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
      "displayName": "Adele Vance",
      "mail": "adelev@contoso.com",
      "jobTitle": "Product Marketing Manager",
      "department": "Sales & Marketing"
    },
    "createdDate": "2024-01-15T12:00:00Z",
    "memberCount": 8
  },
  {
    "id": "45b7d2e9-866f-4a2d-a524-fe0f10c94a34",
    "name": "Website Redesign",
    "description": "Complete overhaul of company website with modern design",
    "status": "on-hold",
    "owner": {
      "id": "2d3d2640-20c3-4c4b-8c7a-4b6b8e4c0f9a",
      "displayName": "Alex Wilber",
      "mail": "alexw@contoso.com",
      "jobTitle": "Software Engineer",
      "department": "Engineering"
    },
    "createdDate": "2024-02-20T14:30:00Z",
    "memberCount": 5
  },
  {
    "id": "c9c9c9c9-8d8d-7a7a-6b6b-5c5c5c5c5c5c",
    "name": "Financial Audit Q4 2023",
    "description": "Annual financial audit and compliance review",
    "status": "completed",
    "owner": {
      "id": "6e7b768e-07e2-4810-8459-485f84f8f204",
      "displayName": "Megan Bowen",
      "mail": "meganb@contoso.com",
      "jobTitle": "Auditor",
      "department": "Finance"
    },
    "createdDate": "2023-10-01T09:00:00Z",
    "memberCount": 3
  }
]
```

## Version History

- **1.0.0** (2025-12-18): Initial schema definition
