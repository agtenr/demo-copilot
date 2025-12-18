/**
 * Streaming response wrapper for real-time data delivery from backend
 */
export interface StreamResponse<T> {
  /** Data payload for this chunk */
  data: T | null;
  
  /** Whether this is the final chunk in the stream */
  isComplete: boolean;
  
  /** Error message if chunk delivery failed */
  error: string | null;
  
  /** Sequential chunk index (0-based) */
  chunkIndex: number;
  
  /** Total number of chunks (if known, null if unknown) */
  totalChunks: number | null;
  
  /** Timestamp when chunk was sent (ISO 8601 format) */
  timestamp: string;
}
