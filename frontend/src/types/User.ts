/**
 * User entity based on Microsoft Graph API User resource
 * @see https://learn.microsoft.com/en-us/graph/api/resources/user
 */
export interface User {
  /** Unique identifier for the user (GUID format) */
  id: string;
  
  /** User's display name (full name) */
  displayName: string;
  
  /** User's given name (first name) */
  givenName?: string;
  
  /** User's surname (last name) */
  surname?: string;
  
  /** Primary email address */
  mail: string;
  
  /** User's job title */
  jobTitle: string;
  
  /** Department name */
  department: string;
  
  /** Physical office location */
  officeLocation?: string;
  
  /** User's business phone numbers */
  businessPhones?: string[];
  
  /** AI-generated summary (from agent) */
  summary?: string;
}

/**
 * Validate user object structure
 * @param user - Object to validate
 * @returns true if valid, false otherwise
 */
export function isValidUser(user: unknown): user is User {
  const u = user as Record<string, unknown>;
  return (
    typeof u?.id === 'string' &&
    typeof u?.displayName === 'string' &&
    typeof u?.mail === 'string' &&
    typeof u?.jobTitle === 'string' &&
    typeof u?.department === 'string'
  );
}
