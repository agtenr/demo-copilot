import React from 'react';
import type { User } from '../../types/User';
import { AGCard } from '../agui/AGCard';
import styles from './UserCard.module.css';

/**
 * Props for UserCard component
 */
export interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
  isStreaming?: boolean;
}

/**
 * UserCard component
 * Displays individual user information in a card format
 */
export const UserCard: React.FC<UserCardProps> = ({ user, onClick, isStreaming = false }) => {
  const handleClick = onClick ? () => onClick(user) : undefined;
  
  return (
    <AGCard onClick={handleClick} className={isStreaming ? styles.streaming : ''}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {user.givenName?.[0] || user.displayName[0]}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{user.displayName}</h3>
          <p className={styles.email}>{user.mail}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Job Title:</span>
          <span className={styles.value}>{user.jobTitle}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Department:</span>
          <span className={styles.value}>{user.department}</span>
        </div>
        {user.officeLocation && (
          <div className={styles.detailRow}>
            <span className={styles.label}>Office:</span>
            <span className={styles.value}>{user.officeLocation}</span>
          </div>
        )}
      </div>
    </AGCard>
  );
};
