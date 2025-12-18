import React from 'react';
import { Link } from 'react-router-dom';
import { AGCard } from '../components/agui/AGCard';
import { AGButton } from '../components/agui/AGButton';
import styles from './HomePage.module.css';

/**
 * HomePage component
 * Landing page with navigation to Users and Projects
 */
export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>AG-UI & Microsoft Agent Framework Demo</h1>
        <p className={styles.subtitle}>
          Demonstrating real-time data streaming from a .NET backend agent to React frontend using AG-UI Protocol
        </p>
      </header>

      <div className={styles.features}>
        <AGCard>
          <h2 className={styles.featureTitle}>📊 View Users</h2>
          <p className={styles.featureDescription}>
            Stream user data from Microsoft Graph API with progressive rendering.
            Watch as users are delivered in real-time chunks via AG-UI Protocol.
          </p>
          <div className={styles.featureActions}>
            <Link to="/users">
              <AGButton variant="primary">View Users</AGButton>
            </Link>
          </div>
        </AGCard>

        <AGCard>
          <h2 className={styles.featureTitle}>🚀 View Projects</h2>
          <p className={styles.featureDescription}>
            Stream project data from Microsoft Graph API with live updates.
            Experience smooth progressive rendering as project data arrives.
          </p>
          <div className={styles.featureActions}>
            <Link to="/projects">
              <AGButton variant="primary">View Projects</AGButton>
            </Link>
          </div>
        </AGCard>
      </div>

      <div className={styles.info}>
        <AGCard>
          <h3 className={styles.infoTitle}>💡 What You'll See</h3>
          <ul className={styles.infoList}>
            <li>Real-time streaming via AG-UI Protocol (simulated)</li>
            <li>Progressive rendering of data as chunks arrive</li>
            <li>Microsoft Agent Framework pattern implementation</li>
            <li>AG-UI components with responsive design</li>
            <li>Loading states and error handling</li>
          </ul>
        </AGCard>

        <AGCard>
          <h3 className={styles.infoTitle}>🛠️ Technologies</h3>
          <ul className={styles.infoList}>
            <li>React 19 with TypeScript</li>
            <li>AG-UI Protocol for streaming</li>
            <li>Microsoft Agent Framework pattern</li>
            <li>Microsoft Graph API (mocked)</li>
            <li>CSS Modules for styling</li>
          </ul>
        </AGCard>
      </div>
    </div>
  );
};
