import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api';

export interface FooterInfo {
  id: number;
  office_name: string;
  address: string;
  map_url: string;
  website_label: string;
  website_url: string;
  email: string;
  pabx_hotline: string;
  sales_hotline: string;
  office_hours: string;
  corporate_status: string;
  reg_no: string | null;
  trading_id: string | null;
  created_at: string;
  updated_at: string;
}

interface FooterInfoResponse {
  success?: boolean;
  data?: FooterInfo | null;
}

const fetchFooterInfo = async (): Promise<FooterInfo | null> => {
  const { data } = await api.get<FooterInfoResponse>('/v1/footer-footer-info');
  if (data?.success === false) return null;
  return data?.data ?? null;
};

export const useFooterInfo = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['footer-footer-info'],
    queryFn: fetchFooterInfo,
    staleTime: 1000 * 60 * 30,
  });

  const message = error
    ? axios.isAxiosError(error)
      ? error.response?.status === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : error.message
      : error instanceof Error
        ? error.message
        : 'Error fetching footer info'
    : null;

  return {
    footerInfo: data ?? null,
    loading: isPending && data === undefined,
    error: message,
    refetch,
  };
};
