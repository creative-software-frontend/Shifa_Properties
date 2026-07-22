import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_class: string;
  is_active: boolean;
  sort_order: number | string;
  created_at?: string;
  updated_at?: string;
}

interface SocialLinksResponse {
  success?: boolean;
  data?: SocialLink[];
}

const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const { data } = await api.get<SocialLinksResponse>('/v1/footer-social-links');
  const list = Array.isArray(data?.data) ? data.data : [];

  return list
    .filter((link) => link.is_active && link.url?.trim())
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
    .map((link) => ({
      ...link,
      platform: (link.platform || '').trim().toLowerCase(),
    }));
};

export const useSocialLinks = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['footer-social-links'],
    queryFn: fetchSocialLinks,
    staleTime: 1000 * 60 * 30,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching social links'
    : null;

  return {
    socialLinks: data ?? [],
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};
