import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import type { Project } from '../types';

const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<{ data: Project[] }>('/v1/project-list');
  return data.data ?? [];
};

export const useProjects = () => {
  const { data, isPending } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return {
    projects: data ?? [],
    loading: isPending && !data,
  };
};
