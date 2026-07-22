import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface OurValue {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface OurValueListResponse {
  success: boolean;
  data: OurValue[];
}

const fetchOurValues = async (): Promise<OurValue[]> => {
  const response = await api.get<OurValueListResponse>('/v1/our-value-list');
  if (response.data?.success) {
    return response.data.data ?? [];
  }
  throw new Error('Failed to fetch our values');
};

export const useOurValues = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['our-value-list'],
    queryFn: fetchOurValues,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching values'
    : null;

  return {
    values: data ?? [],
    loading: isPending && !data,
    error: message,
    refetch,
  };
};
