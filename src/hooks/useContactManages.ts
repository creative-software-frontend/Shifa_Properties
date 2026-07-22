import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export interface ContactManageData {
  id: number;
  call_use: string;
  email: string;
  whatsapp: string;
  career: string;
  created_at?: string;
  updated_at?: string;
}

const fetchContactManages = async (): Promise<ContactManageData | null> => {
  const { data } = await api.get<{ success?: boolean; data?: ContactManageData[] }>('/v1/contact-manages');
  if (data.success && data.data && data.data.length > 0) {
    return data.data[0];
  }
  return null;
};

export const useContactManages = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['contact-manages'],
    queryFn: fetchContactManages,
  });

  return {
    contactData: data ?? null,
    loading: isPending && data === undefined,
    error: error instanceof Error ? error.message : null,
  };
};
