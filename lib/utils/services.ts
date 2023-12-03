import { IProject } from '@/models/project';
import axios from 'axios';
import { timeTrackSchema } from '../validations/time-track';

export async function createUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await axios.post('/api/auth/sign-up', {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
}

export async function createTag(tag: string) {
  const response = await axios.post('/api/user/tags/', { tag });
  return response.data;
}

export async function editTag(oldTag: string, newTag: string) {
  const response = await axios.patch(`/api/user/tags/${oldTag}`, {
    tag: newTag,
  });
  return response.data;
}

export async function editProject(projectId: string, newTitle: string) {
  const response = await axios.patch(`/api/user/projects/${projectId}`, {
    projectTitle: newTitle,
  });
  return response.data;
}

export async function createProject(project: IProject) {
  const response = await axios.post('/api/user/projects', {
    projectTitle: project.projectTitle,
  });
  return response.data;
}

export type TimeTrackRecording = {
  title: string;
  start: Date;
  end: Date;
  tag?: string;
  projectId?: string;
};

export async function sendTimeTrack(timeTrackData: TimeTrackRecording) {
  const validatedData = timeTrackSchema.safeParse(timeTrackData);
  if (!validatedData.success) throw new Error(validatedData.error.message);
  const response = await axios.post(
    '/api/user/time-tracks/',
    validatedData.data
  );
  return response.data;
}

export async function editTimeTrack(trackId: string, newTitle: string) {
  const response = await axios.patch(`/api/user/time-tracks/${trackId}`, {
    newTitle,
  });
  return response.data;
}
