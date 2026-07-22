import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface InvestmentCategory {
  id: number;
  title: string;
}

export interface InvestmentCategoryResponse {
  success: boolean;
  data: InvestmentCategory[];
}

const fetchInvestmentCategories = async (): Promise<InvestmentCategory[]> => {
  const response = await api.get<InvestmentCategoryResponse>('/v1/investment-category-list');
  if (response.data?.success) {
    return response.data.data ?? [];
  }
  throw new Error('Failed to fetch investment categories');
};

export const useInvestmentCategories = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['investment-categories'],
    queryFn: fetchInvestmentCategories,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching categories'
    : null;

  return {
    categories: data ?? [],
    loading: isPending && !data,
    error: message,
  };
};
