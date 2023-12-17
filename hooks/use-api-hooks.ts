import { getTodayStartEndISO } from '@/lib/utils/date';
import useSWR from 'swr';

export function useTags() {
  const { data, error, isLoading, mutate } = useSWR('/api/user/tags');

  return {
    tags: data,
    isLoading,
    error,
    mutate,
  };
}

const timeTracksApi = '/api/user/time-tracks';

export function useTimeTracks() {
  const { data, error, isLoading, mutate } = useSWR(timeTracksApi);

  return {
    timeTracks: data,
    isLoading,
    error,
    mutate,
  };
}

export function useWeeklyTracks(startDate: string, endDate: string) {
  const apiUrl = timeTracksApi + `?startDate=${startDate}&endDate=${endDate}`;
  const { data, error, isLoading, mutate } = useSWR(apiUrl);
  return {
    timeTracks: data,
    isLoading,
    error,
    mutate,
  };
}

export function useTodayTracks() {
  const { start, end } = getTodayStartEndISO();
  const apiUrl = timeTracksApi + `?startDate=${start}&endDate=${end}`;
  const { data, error, isLoading, mutate } = useSWR(apiUrl);
  return {
    timeTracks: data,
    isLoading,
    error,
    mutate,
  };
}

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR('/api/user/projects');

  return {
    projects: data,
    isLoading,
    error,
    mutate,
  };
}

export function useProject(projectId: string) {
  const { data, error, isLoading } = useSWR(`/api/user/projects/${projectId}`);

  return {
    project: data,
    isLoading,
    error,
  };
}
