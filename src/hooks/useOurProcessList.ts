import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

export interface OurProcessItem {
  id: number;
  title: string;
  icon: string;
  image: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}

export interface OurProcessListResponse {
  success: boolean;
  data: Omit<OurProcessItem, 'imageUrl'>[];
}

const fetchOurProcessList = async (): Promise<OurProcessItem[]> => {
  const response = await api.get<OurProcessListResponse>('/v1/our-process-list');
  if (response.data?.success) {
    return (response.data.data ?? []).map((item) => ({
      ...item,
      imageUrl: getImageUrl(item.image),
    }));
  }
  throw new Error('Failed to fetch our process list');
};

export const useOurProcessList = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['our-process-list'],
    queryFn: fetchOurProcessList,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching process list'
    : null;

  return {
    processItems: data ?? [],
    loading: isPending && !data,
    error: message,
    refetch,
  };
};
