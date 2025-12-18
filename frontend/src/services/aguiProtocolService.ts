import type { User } from '../types/User';
import type { Project } from '../types/Project';
import type { StreamResponse } from '../types/StreamResponse';
import { graphAgent } from './GraphAgent';

/**
 * Type for callback functions that receive stream chunks
 */
type StreamCallback<T> = (response: StreamResponse<T>) => void;

/**
 * AG-UI Protocol service for simulated streaming from backend
 * In a real implementation, this would use SignalR or WebSockets
 * For this demo, it simulates streaming behavior with chunks and delays
 */
export class AGUIProtocolService {
  private userCallbacks: StreamCallback<User>[] = [];
  private projectCallbacks: StreamCallback<Project>[] = [];
  private completeCallbacks: (() => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];
  private isConnected: boolean = false;
  private isStreaming: boolean = false;

  /**
   * Connect to AG-UI Protocol endpoint
   * In real implementation, this would establish WebSocket/SignalR connection
   */
  async connect(): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 100));
    this.isConnected = true;
  }

  /**
   * Disconnect from AG-UI Protocol endpoint
   */
  async disconnect(): Promise<void> {
    this.isConnected = false;
    this.userCallbacks = [];
    this.projectCallbacks = [];
    this.completeCallbacks = [];
    this.errorCallbacks = [];
  }

  /**
   * Register callback for receiving user chunks
   */
  onUserReceived(callback: StreamCallback<User>): void {
    this.userCallbacks.push(callback);
  }

  /**
   * Register callback for receiving project chunks
   */
  onProjectReceived(callback: StreamCallback<Project>): void {
    this.projectCallbacks.push(callback);
  }

  /**
   * Register callback for stream completion
   */
  onComplete(callback: () => void): void {
    this.completeCallbacks.push(callback);
  }

  /**
   * Register callback for stream errors
   */
  onError(callback: (error: string) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * Request backend to start streaming users
   * Simulates chunked streaming with progressive delivery
   */
  async startStreamingUsers(): Promise<void> {
    if (!this.isConnected) {
      const error = 'Not connected to AG-UI Protocol endpoint';
      this.errorCallbacks.forEach(cb => cb(error));
      throw new Error(error);
    }

    if (this.isStreaming) {
      const error = 'Stream already in progress';
      this.errorCallbacks.forEach(cb => cb(error));
      throw new Error(error);
    }

    this.isStreaming = true;

    try {
      // Get all users from GraphAgent
      const users = await graphAgent.getUsers();
      
      // Stream users one at a time with delays to simulate real-time streaming
      for (let i = 0; i < users.length; i++) {
        const response: StreamResponse<User> = {
          data: users[i],
          isComplete: i === users.length - 1,
          error: null,
          chunkIndex: i,
          totalChunks: users.length,
          timestamp: new Date().toISOString()
        };

        // Deliver chunk to all registered callbacks
        this.userCallbacks.forEach(cb => cb(response));

        // Add delay between chunks for realistic streaming visualization
        if (i < users.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Notify completion
      this.completeCallbacks.forEach(cb => cb());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Send error response
      const errorResponse: StreamResponse<User> = {
        data: null,
        isComplete: true,
        error: errorMessage,
        chunkIndex: 0,
        totalChunks: 0,
        timestamp: new Date().toISOString()
      };
      
      this.userCallbacks.forEach(cb => cb(errorResponse));
      this.errorCallbacks.forEach(cb => cb(errorMessage));
    } finally {
      this.isStreaming = false;
    }
  }

  /**
   * Request backend to start streaming projects
   * Simulates chunked streaming with progressive delivery
   */
  async startStreamingProjects(): Promise<void> {
    if (!this.isConnected) {
      const error = 'Not connected to AG-UI Protocol endpoint';
      this.errorCallbacks.forEach(cb => cb(error));
      throw new Error(error);
    }

    if (this.isStreaming) {
      const error = 'Stream already in progress';
      this.errorCallbacks.forEach(cb => cb(error));
      throw new Error(error);
    }

    this.isStreaming = true;

    try {
      // Get all projects from GraphAgent
      const projects = await graphAgent.getProjects();
      
      // Stream projects one at a time with delays
      for (let i = 0; i < projects.length; i++) {
        const response: StreamResponse<Project> = {
          data: projects[i],
          isComplete: i === projects.length - 1,
          error: null,
          chunkIndex: i,
          totalChunks: projects.length,
          timestamp: new Date().toISOString()
        };

        // Deliver chunk to all registered callbacks
        this.projectCallbacks.forEach(cb => cb(response));

        // Add delay between chunks for realistic streaming visualization
        if (i < projects.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Notify completion
      this.completeCallbacks.forEach(cb => cb());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Send error response
      const errorResponse: StreamResponse<Project> = {
        data: null,
        isComplete: true,
        error: errorMessage,
        chunkIndex: 0,
        totalChunks: 0,
        timestamp: new Date().toISOString()
      };
      
      this.projectCallbacks.forEach(cb => cb(errorResponse));
      this.errorCallbacks.forEach(cb => cb(errorMessage));
    } finally {
      this.isStreaming = false;
    }
  }

  /**
   * Request backend to stop current stream
   */
  async stopStreaming(): Promise<void> {
    this.isStreaming = false;
    // In real implementation, would send stop signal to backend
  }

  /**
   * Check if protocol is currently connected
   */
  getIsConnected(): boolean {
    return this.isConnected;
  }

  /**
   * Check if stream is currently active
   */
  getIsStreaming(): boolean {
    return this.isStreaming;
  }
}

/**
 * Singleton instance of AG-UI Protocol service
 */
export const aguiProtocolService = new AGUIProtocolService();
