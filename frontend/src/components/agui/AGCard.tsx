import React from 'react';
import styles from './AGCard.module.css';

/**
 * Props for AGCard component
 */
export interface AGCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * AG-UI Card component
 * Displays content in a styled container with shadow and border
 */
export const AGCard: React.FC<AGCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`${styles.card} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
