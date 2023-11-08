import useSWR from 'swr';

export function useTags() {
  const { data, error, isLoading, mutate } = useSWR('/api/tags');

  return {
    tags: data,
    isLoading,
    error,
    mutate,
  };
}

export function useTimeTracks() {
  const { data, error, isLoading, mutate } = useSWR('/api/time-tracks');

  return {
    timeTracks: data,
    isLoading,
    error,
    mutate,
  };
}

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR('/api/projects');

  return {
    projects: data,
    isLoading,
    error,
    mutate,
  };
}
