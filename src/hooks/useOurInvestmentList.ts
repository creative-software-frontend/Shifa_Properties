import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface InvestmentImage {
  id: number;
  our_investment_id: number;
  image_path: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvestmentCategory {
  id: number;
  title: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OurInvestmentItem {
  id: number;
  investment_category_id: number;
  title: string;
  rating: string;
  position: string;
  created_at?: string;
  updated_at?: string;
  images: InvestmentImage[];
  category: InvestmentCategory;
}

export interface OurInvestmentListResponse {
  success: boolean;
  data: OurInvestmentItem[];
}

const fetchOurInvestmentList = async (): Promise<OurInvestmentItem[]> => {
  const response = await api.get<OurInvestmentListResponse>('/v1/our-investment-list');
  if (response.data?.success) {
    // Keep API order — `position` is free text, not a numeric sort key
    return response.data.data || [];
  }
  throw new Error('Failed to fetch investment list');
};

export const useOurInvestmentList = () => {
  const { data, isPending, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['our-investment-list'],
    queryFn: fetchOurInvestmentList,
    staleTime: 1000 * 60 * 60,
  });

  const message = isError
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching investments'
    : null;

  return {
    investments: data ?? [],
    loading: isPending && !data,
    refreshing: isFetching,
    error: message,
    refetch,
  };
};
