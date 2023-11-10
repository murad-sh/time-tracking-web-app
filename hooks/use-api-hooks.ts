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

export function useTimeTracks() {
  const { data, error, isLoading, mutate } = useSWR('/api/user/time-tracks');

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
