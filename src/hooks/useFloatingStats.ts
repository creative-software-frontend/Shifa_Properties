import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface FloatingStats {
  id?: number;
  years: string;
  investors: string;
  project: string;
  created_at?: string;
  updated_at?: string;
}

const fetchFloatingStats = async (): Promise<FloatingStats | null> => {
  const { data } = await api.get<{ success?: boolean; data?: FloatingStats[] }>(
    '/v1/floating-list'
  );
  if (data?.success !== false && Array.isArray(data?.data) && data.data.length > 0) {
    return data.data[0];
  }
  return null;
};

export const useFloatingStats = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['floating-stats'],
    queryFn: fetchFloatingStats,
    staleTime: 1000 * 60 * 60,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching floating stats'
    : null;

  return {
    stats: data ?? null,
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};
