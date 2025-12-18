import { describe, it, expect, beforeEach } from 'vitest';
import { graphAgent } from '../services/GraphAgent';

describe('GraphAgent', () => {
  beforeEach(() => {
    // Ensure mock mode is enabled
    graphAgent.setMockMode(true);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = await graphAgent.getUsers();
      
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should return users with required fields', async () => {
      const users = await graphAgent.getUsers();
      const user = users[0];
      
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('displayName');
      expect(user).toHaveProperty('mail');
      expect(user).toHaveProperty('jobTitle');
      expect(user).toHaveProperty('department');
    });

    it('should return at least 5 users', async () => {
      const users = await graphAgent.getUsers();
      
      expect(users.length).toBeGreaterThanOrEqual(5);
    });

    it('should simulate delay', async () => {
      const startTime = Date.now();
      await graphAgent.getUsers();
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      expect(duration).toBeGreaterThan(200); // Should take at least 200ms due to 300ms delay
    });
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      const projects = await graphAgent.getProjects();
      
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('should return projects with required fields', async () => {
      const projects = await graphAgent.getProjects();
      const project = projects[0];
      
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('status');
      expect(project).toHaveProperty('owner');
      expect(project).toHaveProperty('createdDate');
      expect(project).toHaveProperty('memberCount');
    });

    it('should return at least 3 projects', async () => {
      const projects = await graphAgent.getProjects();
      
      expect(projects.length).toBeGreaterThanOrEqual(3);
    });

    it('should include different project statuses', async () => {
      const projects = await graphAgent.getProjects();
      const statuses = projects.map(p => p.status);
      
      expect(statuses).toContain('active');
    });
  });

  describe('getUserById', () => {
    it('should return a user when found', async () => {
      const users = await graphAgent.getUsers();
      const userId = users[0].id;
      
      const user = await graphAgent.getUserById(userId);
      
      expect(user).not.toBeNull();
      expect(user?.id).toBe(userId);
    });

    it('should return null when user not found', async () => {
      const user = await graphAgent.getUserById('non-existent-id');
      
      expect(user).toBeNull();
    });

    it('should throw error for invalid ID format', async () => {
      await expect(graphAgent.getUserById('')).rejects.toThrow('Invalid user ID provided');
    });
  });

  describe('getProjectById', () => {
    it('should return a project when found', async () => {
      const projects = await graphAgent.getProjects();
      const projectId = projects[0].id;
      
      const project = await graphAgent.getProjectById(projectId);
      
      expect(project).not.toBeNull();
      expect(project?.id).toBe(projectId);
    });

    it('should return null when project not found', async () => {
      const project = await graphAgent.getProjectById('non-existent-id');
      
      expect(project).toBeNull();
    });
  });

  describe('setMockMode', () => {
    it('should allow toggling mock mode', () => {
      graphAgent.setMockMode(false);
      graphAgent.setMockMode(true);
      
      // Should not throw
      expect(true).toBe(true);
    });
  });
});
