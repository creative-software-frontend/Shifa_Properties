import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export interface Testimonial {
  id: number;
  name: string;
  model: string;
  company: string;
  rating: string;
  message: string;
  image?: string;
}

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await api.get<{ data?: Testimonial[] }>('/v1/investor-say-list');
  return data.data ?? [];
};

export const useTestimonials = () => {
  const { data, isPending } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  return { testimonials: data ?? [], loading: isPending && !data };
};
