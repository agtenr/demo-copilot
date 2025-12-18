import type { User } from '../types/User';
import type { Project } from '../types/Project';
import { MOCK_USERS, MOCK_PROJECTS } from './mockData';

/**
 * Graph API Agent Interface using Microsoft Agent Framework pattern
 * Defines methods for extracting and streaming Graph API data
 */
export interface IGraphAgent {
  /**
   * Get all users (non-streaming)
   * @returns Promise that resolves to array of users
   */
  getUsers(): Promise<User[]>;
  
  /**
   * Get all projects (non-streaming)
   * @returns Promise that resolves to array of projects
   */
  getProjects(): Promise<Project[]>;
  
  /**
   * Get a single user by ID
   * @param id - User GUID
   * @returns User or null if not found
   */
  getUserById(id: string): Promise<User | null>;
  
  /**
   * Get a single project by ID
   * @param id - Project GUID
   * @returns Project or null if not found
   */
  getProjectById(id: string): Promise<Project | null>;
  
  /**
   * Enable or disable mock mode
   * @param enabled - Whether to use mock data
   */
  setMockMode(enabled: boolean): void;
}

/**
 * GraphAgent class implementing Microsoft Agent Framework pattern
 * Encapsulates all Graph API logic and provides mock data for demo
 */
export class GraphAgent implements IGraphAgent {
  private mockMode: boolean = true;

  /**
   * Get all users from Graph API
   * In mock mode, returns MOCK_USERS with simulated delay
   */
  async getUsers(): Promise<User[]> {
    // Simulate realistic API delay (300ms)
    await this.delay(300);
    
    if (this.mockMode) {
      // Return copy to prevent external mutations
      return [...MOCK_USERS];
    }
    
    // Real API mode not implemented in this demo
    throw new Error('Real API mode not implemented. Use mock mode.');
  }

  /**
   * Get all projects from Graph API
   * In mock mode, returns MOCK_PROJECTS with simulated delay
   */
  async getProjects(): Promise<Project[]> {
    // Simulate realistic API delay (300ms)
    await this.delay(300);
    
    if (this.mockMode) {
      // Return copy to prevent external mutations
      return [...MOCK_PROJECTS];
    }
    
    // Real API mode not implemented in this demo
    throw new Error('Real API mode not implemented. Use mock mode.');
  }

  /**
   * Get a single user by ID
   * @param id - User GUID
   * @returns User or null if not found
   */
  async getUserById(id: string): Promise<User | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Failed to fetch user: Invalid ID format');
    }

    // Simulate realistic API delay
    await this.delay(100);
    
    if (this.mockMode) {
      const user = MOCK_USERS.find(u => u.id === id);
      return user ? { ...user } : null;
    }
    
    throw new Error('Real API mode not implemented. Use mock mode.');
  }

  /**
   * Get a single project by ID
   * @param id - Project GUID
   * @returns Project or null if not found
   */
  async getProjectById(id: string): Promise<Project | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Failed to fetch project: Invalid ID format');
    }

    // Simulate realistic API delay
    await this.delay(100);
    
    if (this.mockMode) {
      const project = MOCK_PROJECTS.find(p => p.id === id);
      return project ? { ...project } : null;
    }
    
    throw new Error('Real API mode not implemented. Use mock mode.');
  }

  /**
   * Toggle between mock mode and real API mode
   * @param enabled - true for mock mode, false for real API
   */
  setMockMode(enabled: boolean): void {
    this.mockMode = enabled;
  }

  /**
   * Simulate network delay for realistic testing
   * @param ms - Milliseconds to delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Singleton instance of GraphAgent
 * Export a single instance for use throughout the application
 */
export const graphAgent = new GraphAgent();
