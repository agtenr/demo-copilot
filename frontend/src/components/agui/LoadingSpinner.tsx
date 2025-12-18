import React from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * Props for LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

/**
 * Loading Spinner component
 * Displays animated spinner with optional message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  message 
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
