import React from 'react';
import styles from './AGButton.module.css';

/**
 * Props for AGButton component
 */
export interface AGButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * AG-UI Button component
 * Styled button with multiple variants
 */
export const AGButton: React.FC<AGButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  type = 'button'
}) => {
  const className = `${styles.button} ${styles[variant]}`;
  
  return (
    <button 
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
