import React from 'react';
import type { Project } from '../../types/Project';
import { ProjectCard } from './ProjectCard';
import { AGStreamingList } from '../agui/AGStreamingList';
import { LoadingSpinner } from '../agui/LoadingSpinner';
import { ErrorDisplay } from '../agui/ErrorDisplay';
import { AGButton } from '../agui/AGButton';
import styles from './ProjectList.module.css';

/**
 * Props for ProjectList component
 */
export interface ProjectListProps {
  projects: Project[];
  isStreaming?: boolean;
  error?: string | null;
  onProjectClick?: (project: Project) => void;
  onRefresh?: () => void;
  showProgress?: boolean;
  totalProjects?: number;
}

/**
 * ProjectList component
 * Displays list of projects with streaming support
 */
export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isStreaming = false,
  error = null,
  onProjectClick,
  onRefresh,
  showProgress = true,
  totalProjects
}) => {
  // Show error state
  if (error && !isStreaming && projects.length === 0) {
    return <ErrorDisplay message={error} onRetry={onRefresh} />;
  }

  // Show initial loading state (before any data arrives)
  if (isStreaming && projects.length === 0) {
    return <LoadingSpinner message="Connecting to stream..." />;
  }

  return (
    <div className={styles.container}>
      {onRefresh && (
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
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
        items={projects}
        isStreaming={isStreaming}
        renderItem={(project) => (
          <ProjectCard 
            key={project.id}
            project={project} 
            onClick={onProjectClick}
            isStreaming={isStreaming}
          />
        )}
        loadingMessage="Streaming projects from Microsoft Graph API..."
        completionMessage={`Successfully loaded ${projects.length} projects`}
        showProgress={showProgress}
        totalItems={totalProjects}
      />
    </div>
  );
};
