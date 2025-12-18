import React from 'react';
import type { User } from '../../types/User';
import { UserCard } from './UserCard';
import { AGStreamingList } from '../agui/AGStreamingList';
import { LoadingSpinner } from '../agui/LoadingSpinner';
import { ErrorDisplay } from '../agui/ErrorDisplay';
import { AGButton } from '../agui/AGButton';
import styles from './UserList.module.css';

/**
 * Props for UserList component
 */
export interface UserListProps {
  users: User[];
  isStreaming?: boolean;
  error?: string | null;
  onUserClick?: (user: User) => void;
  onRefresh?: () => void;
  showProgress?: boolean;
  totalUsers?: number;
}

/**
 * UserList component
 * Displays list of users with streaming support
 */
export const UserList: React.FC<UserListProps> = ({
  users,
  isStreaming = false,
  error = null,
  onUserClick,
  onRefresh,
  showProgress = true,
  totalUsers
}) => {
  // Show error state
  if (error && !isStreaming && users.length === 0) {
    return <ErrorDisplay message={error} onRetry={onRefresh} />;
  }

  // Show initial loading state (before any data arrives)
  if (isStreaming && users.length === 0) {
    return <LoadingSpinner message="Connecting to stream..." />;
  }

  return (
    <div className={styles.container}>
      {onRefresh && (
        <div className={styles.header}>
          <h2 className={styles.title}>Users</h2>
          <AGButton 
            variant="outline" 
            onClick={onRefresh}
            disabled={isStreaming}
          >
            {isStreaming ? 'Streaming...' : 'Refresh'}
          </AGButton>
        </div>
      )}
      
      <AGStreamingList
        items={users}
        isStreaming={isStreaming}
        renderItem={(user) => (
          <UserCard 
            key={user.id}
            user={user} 
            onClick={onUserClick}
            isStreaming={isStreaming}
          />
        )}
        loadingMessage="Streaming users from Microsoft Graph API..."
        completionMessage={`Successfully loaded ${users.length} users`}
        showProgress={showProgress}
        totalItems={totalUsers}
      />
    </div>
  );
};
