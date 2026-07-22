import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  file_path: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const fetchGallery = async (): Promise<GalleryItem[]> => {
  const { data } = await api.get<{ success?: boolean; data?: GalleryItem[] }>('/v1/image-gallery-list');
  if (data.success && data.data) return data.data;
  throw new Error('Invalid gallery response');
};

export const useGallery = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  });

  return {
    gallery: data ?? [],
    loading: isPending && !data,
    error: error instanceof Error ? error : null,
  };
};
