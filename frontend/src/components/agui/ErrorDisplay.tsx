import React from 'react';
import { AGButton } from './AGButton';
import styles from './ErrorDisplay.module.css';

/**
 * Props for ErrorDisplay component
 */
export interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Error Display component
 * Shows error message with optional retry button
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <AGButton variant="outline" onClick={onRetry}>
          Retry
        </AGButton>
      )}
    </div>
  );
};
