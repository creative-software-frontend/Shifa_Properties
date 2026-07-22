import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

export interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  banner: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const fetchWhyUs = async (): Promise<WhyUsItem[]> => {
  const { data } = await api.get<{ data?: Omit<WhyUsItem, 'image'>[] }>('/v1/why-use-list');
  return (data.data ?? []).map((item) => ({
    ...item,
    image: getImageUrl(item.banner),
  }));
};

export const useWhyUs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['why-us-list'],
    queryFn: fetchWhyUs,
  });

  return {
    whyUsItems: data ?? [],
    loading: isPending && !data,
    error: error instanceof Error ? error.message : null,
  };
};
