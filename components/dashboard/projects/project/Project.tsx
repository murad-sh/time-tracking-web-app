import { useProject } from '@/hooks/use-api-hooks';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Project.module.scss';
import Layout from './Layout';
import { calculateTotalDuration, getDuration } from '@/lib/utils/date';
import { ITimeTrack } from '@/models/time-track';

const Project = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { project, isLoading, error } = useProject(projectId);

  // TODO: Skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: Error message
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <h2>{project.projectTitle}</h2>
      <p>
        Total time spent on this project:
        {calculateTotalDuration(project.timeTracks)}
      </p>
      <ul>
        {project.timeTracks.map((track: ITimeTrack) => (
          <li key={track._id.toString()}>
            <p>
              {track.title}:
              <span>
                duration :
                {getDuration(new Date(track.start), new Date(track.end))}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Project;
