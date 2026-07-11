import { useState, useEffect } from 'react';
import api from '../utils/api';

export interface InvestmentCategory {
  id: number;
  title: string;
}

export interface InvestmentCategoryResponse {
  success: boolean;
  data: InvestmentCategory[];
}

export const useInvestmentCategories = () => {
  const [categories, setCategories] = useState<InvestmentCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<InvestmentCategoryResponse>('/v1/investment-category-list');
        if (response.data && response.data.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to fetch investment categories');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
