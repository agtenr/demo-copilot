import { describe, it, expect } from 'vitest';
import { isValidUser } from '../types/User';
import { isValidProject } from '../types/Project';

describe('Type Validators', () => {
  describe('isValidUser', () => {
    it('should validate a valid user object', () => {
      const validUser = {
        id: '123',
        displayName: 'John Doe',
        mail: 'john@example.com',
        jobTitle: 'Engineer',
        department: 'Engineering'
      };
      
      expect(isValidUser(validUser)).toBe(true);
    });

    it('should reject user without required id', () => {
      const invalidUser = {
        displayName: 'John Doe',
        mail: 'john@example.com',
        jobTitle: 'Engineer',
        department: 'Engineering'
      };
      
      expect(isValidUser(invalidUser)).toBe(false);
    });

    it('should reject user without displayName', () => {
      const invalidUser = {
        id: '123',
        mail: 'john@example.com',
        jobTitle: 'Engineer',
        department: 'Engineering'
      };
      
      expect(isValidUser(invalidUser)).toBe(false);
    });

    it('should reject non-object values', () => {
      expect(isValidUser(null)).toBe(false);
      expect(isValidUser(undefined)).toBe(false);
      expect(isValidUser('string')).toBe(false);
      expect(isValidUser(123)).toBe(false);
    });
  });

  describe('isValidProject', () => {
    it('should validate a valid project object', () => {
      const validProject = {
        id: '456',
        name: 'Test Project',
        description: 'A test project',
        status: 'active',
        owner: {
          id: '123',
          displayName: 'John Doe',
          mail: 'john@example.com',
          jobTitle: 'Engineer',
          department: 'Engineering'
        },
        createdDate: '2024-01-01T00:00:00Z',
        memberCount: 5
      };
      
      expect(isValidProject(validProject)).toBe(true);
    });

    it('should reject project with invalid status', () => {
      const invalidProject = {
        id: '456',
        name: 'Test Project',
        description: 'A test project',
        status: 'invalid-status',
        owner: {
          id: '123',
          displayName: 'John Doe',
          mail: 'john@example.com',
          jobTitle: 'Engineer',
          department: 'Engineering'
        },
        createdDate: '2024-01-01T00:00:00Z',
        memberCount: 5
      };
      
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should reject project with invalid owner', () => {
      const invalidProject = {
        id: '456',
        name: 'Test Project',
        description: 'A test project',
        status: 'active',
        owner: {
          id: '123'
          // Missing required fields
        },
        createdDate: '2024-01-01T00:00:00Z',
        memberCount: 5
      };
      
      expect(isValidProject(invalidProject)).toBe(false);
    });
  });
});
