import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectList } from '../components/projects/ProjectList';
import { useStreamingData } from '../hooks/useStreamingData';
import { AGButton } from '../components/agui/AGButton';
import styles from './ProjectsPage.module.css';

/**
 * ProjectsPage component
 * Displays streaming project data from Microsoft Graph API
 */
export const ProjectsPage: React.FC = () => {
  const { projects, isStreaming, error, streamProjects, progress } = useStreamingData();

  // Start streaming on mount
  useEffect(() => {
    streamProjects();
  }, [streamProjects]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Microsoft Graph Projects</h1>
        <p className={styles.subtitle}>
          Streaming project data via AG-UI Protocol with progressive rendering
        </p>
      </header>

      <ProjectList
        projects={projects}
        isStreaming={isStreaming}
        error={error}
        onRefresh={streamProjects}
        showProgress={true}
        totalProjects={progress.total || undefined}
      />

      {!isStreaming && projects.length > 0 && (
        <div className={styles.actions}>
          <AGButton variant="outline" onClick={streamProjects}>
            Stream Again
          </AGButton>
        </div>
      )}
    </div>
  );
};
