import React from 'react';
import styles from './AGStreamingList.module.css';

/**
 * Props for AG-UI streaming list component
 */
export interface AGStreamingListProps<T> {
  /** Items currently received from stream */
  items: T[];
  
  /** Whether stream is currently active */
  isStreaming: boolean;
  
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  
  /** Optional loading message */
  loadingMessage?: string;
  
  /** Optional completion message */
  completionMessage?: string;
  
  /** Show progress indicator */
  showProgress?: boolean;
  
  /** Total items expected (if known) */
  totalItems?: number;
}

/**
 * AG-UI Streaming List component
 * Displays items as they stream in with progressive rendering
 */
export function AGStreamingList<T>({
  items,
  isStreaming,
  renderItem,
  loadingMessage = 'Streaming data...',
  completionMessage,
  showProgress = true,
  totalItems
}: AGStreamingListProps<T>) {
  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {isStreaming && (
        <div className={styles.streamingIndicator}>
          <div className={styles.pulse} />
          <span>{loadingMessage}</span>
          {showProgress && totalItems && (
            <span className={styles.progress}>
              {items.length} / {totalItems}
            </span>
          )}
        </div>
      )}
      
      {!isStreaming && items.length > 0 && completionMessage && (
        <div className={styles.completionMessage}>
          {completionMessage}
        </div>
      )}
    </div>
  );
}
