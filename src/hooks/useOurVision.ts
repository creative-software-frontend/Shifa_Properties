import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export interface VisionData {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const fetchOurVision = async (): Promise<VisionData | null> => {
  const { data } = await api.get<{ success?: boolean; data?: VisionData[] }>('/v1/our-vision-list');
  if (data.success && Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  return null;
};

export const useOurVision = () => {
  const { data, isPending } = useQuery({
    queryKey: ['our-vision'],
    queryFn: fetchOurVision,
  });

  return { visionData: data ?? null, loading: isPending && data === undefined };
};
