import { useState, useCallback } from 'react';
import type { User } from '../types/User';
import type { Project } from '../types/Project';
import { useAGUIProtocol } from './useAGUIProtocol';

/**
 * Return type for useStreamingData hook
 */
export interface UseStreamingDataResult {
  /** Current list of users received from stream */
  users: User[];
  
  /** Current list of projects received from stream */
  projects: Project[];
  
  /** Whether stream is currently active */
  isStreaming: boolean;
  
  /** Error message from the most recent failed stream */
  error: string | null;
  
  /** Function to start streaming users */
  streamUsers: () => Promise<void>;
  
  /** Function to start streaming projects */
  streamProjects: () => Promise<void>;
  
  /** Function to stop current stream */
  stopStreaming: () => Promise<void>;
  
  /** Progress info: current count and total if known */
  progress: {
    current: number;
    total: number | null;
  };
}

/**
 * Custom hook for streaming data via AG-UI Protocol
 * Manages streaming state, data accumulation, and error handling
 */
export function useStreamingData(): UseStreamingDataResult {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number | null }>({
    current: 0,
    total: null
  });

  const { service } = useAGUIProtocol();

  /**
   * Start streaming users from backend
   */
  const streamUsers = useCallback(async () => {
    setIsStreaming(true);
    setError(null);
    setUsers([]);
    setProgress({ current: 0, total: null });

    // Register callback for user chunks
    service.onUserReceived((response) => {
      if (response.error) {
        setError(response.error);
        setIsStreaming(false);
        return;
      }

      if (response.data) {
        setUsers(prev => [...prev, response.data!]);
        setProgress({
          current: response.chunkIndex + 1,
          total: response.totalChunks
        });
      }

      if (response.isComplete) {
        setIsStreaming(false);
      }
    });

    // Register completion callback
    service.onComplete(() => {
      setIsStreaming(false);
    });

    // Register error callback
    service.onError((errorMessage) => {
      setError(errorMessage);
      setIsStreaming(false);
    });

    try {
      await service.startStreamingUsers();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsStreaming(false);
    }
  }, [service]);

  /**
   * Start streaming projects from backend
   */
  const streamProjects = useCallback(async () => {
    setIsStreaming(true);
    setError(null);
    setProjects([]);
    setProgress({ current: 0, total: null });

    // Register callback for project chunks
    service.onProjectReceived((response) => {
      if (response.error) {
        setError(response.error);
        setIsStreaming(false);
        return;
      }

      if (response.data) {
        setProjects(prev => [...prev, response.data!]);
        setProgress({
          current: response.chunkIndex + 1,
          total: response.totalChunks
        });
      }

      if (response.isComplete) {
        setIsStreaming(false);
      }
    });

    // Register completion callback
    service.onComplete(() => {
      setIsStreaming(false);
    });

    // Register error callback
    service.onError((errorMessage) => {
      setError(errorMessage);
      setIsStreaming(false);
    });

    try {
      await service.startStreamingProjects();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsStreaming(false);
    }
  }, [service]);

  /**
   * Stop current streaming operation
   */
  const stopStreaming = useCallback(async () => {
    await service.stopStreaming();
    setIsStreaming(false);
  }, [service]);

  return {
    users,
    projects,
    isStreaming,
    error,
    streamUsers,
    streamProjects,
    stopStreaming,
    progress
  };
}
