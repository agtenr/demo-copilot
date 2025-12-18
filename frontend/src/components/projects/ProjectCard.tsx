import React from 'react';
import type { Project, ProjectStatus } from '../../types/Project';
import { AGCard } from '../agui/AGCard';
import styles from './ProjectCard.module.css';

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  isStreaming?: boolean;
}

/**
 * Get status badge color based on project status
 */
function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case 'active':
      return styles.statusActive;
    case 'completed':
      return styles.statusCompleted;
    case 'on-hold':
      return styles.statusOnHold;
    default:
      return '';
  }
}

/**
 * ProjectCard component
 * Displays individual project information in a card format
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isStreaming = false }) => {
  const handleClick = onClick ? () => onClick(project) : undefined;
  
  return (
    <AGCard onClick={handleClick} className={isStreaming ? styles.streaming : ''}>
      <div className={styles.header}>
        <h3 className={styles.name}>{project.name}</h3>
        <span className={`${styles.statusBadge} ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className={styles.description}>{project.description}</p>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Owner:</span>
          <span className={styles.value}>{project.owner.displayName}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Department:</span>
          <span className={styles.value}>{project.owner.department}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Members:</span>
          <span className={styles.value}>{project.memberCount}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Created:</span>
          <span className={styles.value}>
            {new Date(project.createdDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </AGCard>
  );
};
