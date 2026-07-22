import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface OurMissionItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface OurMissionListResponse {
  success: boolean;
  data: OurMissionItem[];
}

const fetchOurMissionList = async (): Promise<OurMissionItem[]> => {
  const response = await api.get<OurMissionListResponse>('/v1/our-mission-list');
  if (response.data?.success) {
    return response.data.data ?? [];
  }
  throw new Error('Failed to fetch our mission list');
};

export const useOurMissionList = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['our-mission-list'],
    queryFn: fetchOurMissionList,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching mission list'
    : null;

  return {
    missions: data ?? [],
    loading: isPending && !data,
    error: message,
    refetch,
  };
};
