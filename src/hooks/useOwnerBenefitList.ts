import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface OwnerBenefitItem {
  id: number;
  owner_benefit_id: number;
  benefit_name: string;
  icon: string;
  created_at?: string;
  updated_at?: string;
}

export interface OwnerBenefit {
  id: number;
  title: string;
  description: string;
  video_url: string;
  items: OwnerBenefitItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OwnerBenefitListResponse {
  success: boolean;
  data: OwnerBenefit[];
}

const fetchOwnerBenefitList = async (): Promise<OwnerBenefit | null> => {
  const response = await api.get<OwnerBenefitListResponse>('/v1/owner-benefit-list');
  if (response.data?.success) {
    return response.data.data?.[0] ?? null;
  }
  throw new Error('Failed to fetch owner benefits');
};

export const useOwnerBenefitList = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['owner-benefit-list'],
    queryFn: fetchOwnerBenefitList,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching owner benefits'
    : null;

  return {
    ownerBenefit: data ?? null,
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export { getYoutubeEmbedUrl };

/**
 * Resolves how the video button should behave:
 * - 'embed': play inline in a modal (valid extractable YouTube ID)
 * - 'external': open the raw URL in a new tab (URL exists but has no video ID, e.g. bare "youtube.com/")
 * - 'none': no video configured at all — hide the play control
 */
export function resolveVideoAction(url: string | undefined | null): {
  mode: 'embed' | 'external' | 'none';
  embedUrl: string | null;
  externalUrl: string | null;
} {
  if (!url || !url.trim()) return { mode: 'none', embedUrl: null, externalUrl: null };
  const embedUrl = getYoutubeEmbedUrl(url);
  if (embedUrl) return { mode: 'embed', embedUrl, externalUrl: null };
  return { mode: 'external', embedUrl: null, externalUrl: url };
}
