import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface Job {
  id: number;
  role: string;
  department: string;
  location: string;
  deadline: string;
  description: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Note: this endpoint is not versioned (no `/v1` prefix), unlike most other endpoints.
// Full URL resolves to: https://backend.shifaproperties.com/api/job-post-list
const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await api.get<Job[] | { data: Job[] }>('/job-post-list');
  const list = Array.isArray(data) ? data : data?.data ?? [];
  return list.filter((job) => job.status === 'active');
};

export const useJobs = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['job-post-list'],
    queryFn: fetchJobs,
    staleTime: 1000 * 60 * 10,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching job openings'
    : null;

  return {
    jobs: data ?? [],
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};
