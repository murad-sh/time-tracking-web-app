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

export function useTimeTracks(startDate?: string, endDate?: string) {
  let apiUrl = '/api/user/time-tracks';
  if (startDate && endDate) {
    apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
  }
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
