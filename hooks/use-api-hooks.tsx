import useSWR from 'swr';

export function useTags() {
  const { data, error, isLoading } = useSWR('/api/tags');

  return {
    tags: data,
    isLoading,
    error,
  };
}

export function useTimeTracks() {
  const { data, error, isLoading } = useSWR('/api/time-tracks');

  return {
    timeTracks: data,
    isLoading,
    error,
  };
}

export function useProjects() {
  const { data, error, isLoading } = useSWR('/api/projects');

  return {
    projects: data,
    isLoading,
    error,
  };
}
