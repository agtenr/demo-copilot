/**
 * Generic API response wrapper with loading and error states
 * Used by hooks to manage async operations (non-streaming)
 */
export interface ApiResponse<T> {
  /** The actual data returned from the API (null if loading or error) */
  data: T | null;
  
  /** Whether the request is currently in progress */
  loading: boolean;
  
  /** Error message if request failed (null if success or loading) */
  error: string | null;
  
  /** Timestamp when the response was received (Unix milliseconds) */
  timestamp: number;
}
