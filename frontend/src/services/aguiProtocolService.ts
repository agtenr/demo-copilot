import type { User } from '../types/User';
import type { Project } from '../types/Project';
import type { StreamResponse } from '../types/StreamResponse';
import * as signalR from '@microsoft/signalr';

/**
 * Type for callback functions that receive stream chunks
 */
type StreamCallback<T> = (response: StreamResponse<T>) => void;

/**
 * AG-UI Protocol service using SignalR for real-time streaming from .NET backend
 * Connects to the GraphDataHub endpoint on the backend
 */
export class AGUIProtocolService {
  private connection: signalR.HubConnection | null = null;
  private userCallbacks: StreamCallback<User>[] = [];
  private projectCallbacks: StreamCallback<Project>[] = [];
  private completeCallbacks: (() => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];
  private isConnected: boolean = false;
  private isStreaming: boolean = false;

  /**
   * Connect to SignalR hub on .NET backend
   */
  async connect(): Promise<void> {
    if (this.connection) {
      return;
    }

    // Create SignalR connection to backend
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/graphhub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Set up event handlers
    this.connection.on('ReceiveUserChunk', (response: StreamResponse<User>) => {
      this.userCallbacks.forEach(cb => cb(response));
      
      if (response.isComplete) {
        this.isStreaming = false;
        this.completeCallbacks.forEach(cb => cb());
      }
    });

    this.connection.on('ReceiveProjectChunk', (response: StreamResponse<Project>) => {
      this.projectCallbacks.forEach(cb => cb(response));
      
      if (response.isComplete) {
        this.isStreaming = false;
        this.completeCallbacks.forEach(cb => cb());
      }
    });

    // Handle connection lifecycle
    this.connection.onclose(() => {
      this.isConnected = false;
      console.log('SignalR connection closed');
    });

    this.connection.onreconnecting(() => {
      console.log('SignalR reconnecting...');
    });

    this.connection.onreconnected(() => {
      this.isConnected = true;
      console.log('SignalR reconnected');
    });

    // Start the connection
    try {
      await this.connection.start();
      this.isConnected = true;
      console.log('SignalR connected to backend');
    } catch (error) {
      console.error('Failed to connect to SignalR:', error);
      throw error;
    }
  }

  /**
   * Disconnect from SignalR hub
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.isConnected = false;
      this.userCallbacks = [];
      this.projectCallbacks = [];
      this.completeCallbacks = [];
      this.errorCallbacks = [];
    }
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
   */
  async startStreamingUsers(): Promise<void> {
    if (!this.connection || !this.isConnected) {
      const error = 'Not connected to SignalR backend';
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
      // Invoke StreamUsers method on backend hub
      await this.connection.invoke('StreamUsers');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.errorCallbacks.forEach(cb => cb(errorMessage));
      this.isStreaming = false;
      throw error;
    }
  }

  /**
   * Request backend to start streaming projects
   */
  async startStreamingProjects(): Promise<void> {
    if (!this.connection || !this.isConnected) {
      const error = 'Not connected to SignalR backend';
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
      // Invoke StreamProjects method on backend hub
      await this.connection.invoke('StreamProjects');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.errorCallbacks.forEach(cb => cb(errorMessage));
      this.isStreaming = false;
      throw error;
    }
  }

  /**
   * Request backend to stop current stream
   */
  async stopStreaming(): Promise<void> {
    this.isStreaming = false;
    // SignalR doesn't need explicit stop, just set flag
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
