import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  description: string;
  photo: string;
  photoUrl: string;
  created_at?: string;
  updated_at?: string;
}

interface TeamListResponse {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
    designation: string;
    description: string;
    photo: string;
    created_at?: string;
    updated_at?: string;
  }>;
}

const fetchTeamList = async (): Promise<TeamMember[]> => {
  const response = await api.get<TeamListResponse>('/v1/team-list');
  if (response.data?.success) {
    return (response.data.data ?? []).map((item) => ({
      ...item,
      photoUrl: getImageUrl(item.photo),
    }));
  }
  throw new Error('Failed to fetch team list');
};

export const useTeamList = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['team-list'],
    queryFn: fetchTeamList,
    staleTime: 1000 * 60 * 30,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching team list'
    : null;

  return {
    members: data ?? [],
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};
