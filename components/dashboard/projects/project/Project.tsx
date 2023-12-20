import { useProject } from '@/hooks/use-api-hooks';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from './Layout';
import { calculateTotalDuration, getTrackDuration } from '@/lib/utils/date';
import { ITimeTrack } from '@/models/time-track';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ProjectSkeleton from './ProjectSkeleton';
import styles from './Project.module.scss';

const Project = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { project, isLoading, error } = useProject(projectId);

  if (isLoading) {
    return (
      <Layout>
        <ProjectSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage />
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className={styles.title}>{project.projectTitle}</h2>
      {project.timeTracks.length === 0 ? (
        <EmptyProject />
      ) : (
        <>
          <p className={styles.total}>
            Total time spent on this project:
            <span>{calculateTotalDuration(project.timeTracks)}</span>
          </p>
          <ul className={styles.list}>
            {project.timeTracks.map((track: ITimeTrack) => (
              <li key={track._id.toString()}>
                <p className={styles.description}>{track.title}</p>
                <span>
                  Duration:
                  <span className={styles.duration}>
                    {getTrackDuration(
                      new Date(track.start),
                      new Date(track.end)
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  );
};

export default Project;

const EmptyProject = () => {
  return (
    <div className={styles.empty}>
      <h3>No Time Tracks Recorded</h3>
      <p>
        Start tracking your time by selecting this project when recording your
        activities to see details here.
      </p>
    </div>
  );
};
