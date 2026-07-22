import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export interface SisterConcern {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const fetchSisterConcerns = async (): Promise<SisterConcern[]> => {
  const { data } = await api.get<{ data?: SisterConcern[] }>('/v1/sister-concerns');
  return data.data ?? [];
};

export const useSisterConcerns = () => {
  const { data, isPending } = useQuery({
    queryKey: ['sister-concerns'],
    queryFn: fetchSisterConcerns,
  });

  return { sisterConcerns: data ?? [], loading: isPending && !data };
};
