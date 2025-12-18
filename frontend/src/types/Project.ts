import type { User } from './User';
import { isValidUser } from './User';

/**
 * Project status enum
 */
export type ProjectStatus = 'active' | 'completed' | 'on-hold';

/**
 * Project entity (adapted from Microsoft Graph API Group resource)
 * @see https://learn.microsoft.com/en-us/graph/api/resources/group
 */
export interface Project {
  /** Unique identifier for the project (GUID format) */
  id: string;
  
  /** Project name */
  name: string;
  
  /** Detailed project description */
  description: string;
  
  /** Current project status */
  status: ProjectStatus;
  
  /** Project owner (User reference) */
  owner: User;
  
  /** When the project was created (ISO 8601 format) */
  createdDate: string;
  
  /** Number of team members */
  memberCount: number;
  
  /** Project email alias (optional) */
  mail?: string;
}

/**
 * Validate project object structure
 * @param project - Object to validate
 * @returns true if valid, false otherwise
 */
export function isValidProject(project: unknown): project is Project {
  const p = project as Record<string, unknown>;
  return (
    typeof p?.id === 'string' &&
    typeof p?.name === 'string' &&
    typeof p?.description === 'string' &&
    ['active', 'completed', 'on-hold'].includes(p?.status as string) &&
    isValidUser(p?.owner) &&
    typeof p?.createdDate === 'string' &&
    typeof p?.memberCount === 'number'
  );
}
