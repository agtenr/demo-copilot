import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../components/users/UserList';
import { useStreamingData } from '../hooks/useStreamingData';
import { AGButton } from '../components/agui/AGButton';
import styles from './UsersPage.module.css';

/**
 * UsersPage component
 * Displays streaming user data from Microsoft Graph API
 */
export const UsersPage: React.FC = () => {
  const { users, isStreaming, error, streamUsers, progress } = useStreamingData();

  // Start streaming on mount
  useEffect(() => {
    streamUsers();
  }, [streamUsers]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Microsoft Graph Users</h1>
        <p className={styles.subtitle}>
          Streaming user data via AG-UI Protocol with progressive rendering
        </p>
      </header>

      <UserList
        users={users}
        isStreaming={isStreaming}
        error={error}
        onRefresh={streamUsers}
        showProgress={true}
        totalUsers={progress.total || undefined}
      />

      {!isStreaming && users.length > 0 && (
        <div className={styles.actions}>
          <AGButton variant="outline" onClick={streamUsers}>
            Stream Again
          </AGButton>
        </div>
      )}
    </div>
  );
};
