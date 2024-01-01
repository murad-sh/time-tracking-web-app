import { IProject } from '@/models/project';
import axios from 'axios';
import { timeTrackSchema } from '../validations/time-track';

const tagsApiUrl = '/api/user/tags/';
const projectsApiUrl = '/api/user/projects/';
const timeTracksApiUrl = '/api/user/time-tracks/';

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
  const response = await axios.post(tagsApiUrl, { tag });
  return response.data;
}

export async function editTag(oldTag: string, newTag: string) {
  const response = await axios.patch(tagsApiUrl + oldTag, {
    tag: newTag,
  });
  return response.data;
}

export async function deleteTag(tag: string) {
  const response = await axios.delete(tagsApiUrl + tag);
  return response.data;
}

export async function createProject(project: IProject) {
  const response = await axios.post(projectsApiUrl, {
    projectTitle: project.projectTitle,
  });
  return response.data;
}
export async function editProject(projectId: string, newTitle: string) {
  const response = await axios.patch(projectsApiUrl + projectId, {
    projectTitle: newTitle,
  });
  return response.data;
}

export async function deleteProject(projectId: string) {
  const response = await axios.delete(projectsApiUrl + projectId);
  return response.data;
}

export type TimeTrackRecording = {
  title: string;
  start: string;
  end: string;
  tag?: string;
  projectId?: string;
};

export async function sendTimeTrack(timeTrackData: TimeTrackRecording) {
  const validatedData = timeTrackSchema.safeParse(timeTrackData);
  if (!validatedData.success) throw new Error(validatedData.error.message);
  const response = await axios.post(timeTracksApiUrl, validatedData.data);
  return response.data;
}

export async function editTimeTrack(trackId: string, newTitle: string) {
  const response = await axios.patch(timeTracksApiUrl + trackId, {
    newTitle,
  });
  return response.data;
}

export async function deleteTimeTrack(trackId: string) {
  const response = await axios.delete(timeTracksApiUrl + trackId);
  return response.data;
}
