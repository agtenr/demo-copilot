import { useState, useEffect } from 'react';
import { AGUIProtocolService, aguiProtocolService } from '../services/aguiProtocolService';

/**
 * Return type for useAGUIProtocol hook
 */
export interface UseAGUIProtocolResult {
  /** Whether AG-UI Protocol is connected */
  isConnected: boolean;
  
  /** Connection error if any */
  connectionError: string | null;
  
  /** Connect to AG-UI Protocol endpoint */
  connect: () => Promise<void>;
  
  /** Disconnect from AG-UI Protocol endpoint */
  disconnect: () => Promise<void>;
  
  /** Underlying AG-UI Protocol service instance */
  service: AGUIProtocolService;
}

/**
 * Custom hook for managing AG-UI Protocol connection
 * Handles connection lifecycle and provides service instance
 */
export function useAGUIProtocol(): UseAGUIProtocolResult {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Connect to AG-UI Protocol on mount
  useEffect(() => {
    const initConnection = async () => {
      try {
        await aguiProtocolService.connect();
        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to connect';
        setConnectionError(errorMessage);
        setIsConnected(false);
      }
    };

    initConnection();

    // Cleanup on unmount
    return () => {
      aguiProtocolService.disconnect();
    };
  }, []);

  const connect = async () => {
    try {
      await aguiProtocolService.connect();
      setIsConnected(true);
      setConnectionError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect';
      setConnectionError(errorMessage);
      throw error;
    }
  };

  const disconnect = async () => {
    await aguiProtocolService.disconnect();
    setIsConnected(false);
  };

  return {
    isConnected,
    connectionError,
    connect,
    disconnect,
    service: aguiProtocolService
  };
}
