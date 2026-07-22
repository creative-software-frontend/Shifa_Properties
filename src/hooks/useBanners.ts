import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export interface Banner {
  id: number;
  title: string;
  description: string;
  photo: string;
  image: string;
  ctaLink?: string;
  cta?: Record<string, string>;
}

const fetchBanners = async (): Promise<Banner[]> => {
  const { data } = await api.get<{ data?: Omit<Banner, 'image'>[] }>('/v1/banner-list');
  return (data.data ?? []).map((banner) => ({
    ...banner,
    image: `${IMAGE_BASE_URL.replace(/\/$/, '')}/${banner.photo}`,
  }));
};

export const useBanners = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
  });

  return {
    banners: data ?? [],
    loading: isPending && !data,
    error: error instanceof Error ? error.message : null,
  };
};
