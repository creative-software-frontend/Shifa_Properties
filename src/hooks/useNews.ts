import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const IMAGE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL?.replace(/\/$/, '') + '/';

export interface News {
  id: number;
  title: string;
  description: string;
  photo: string;
  news_paper_name: string;
  created_at: string;
  news_type: {
    id: number;
    title: string;
  } | null;
}

const fetchNews = async (): Promise<News[]> => {
  const { data } = await api.get<{ data: News[] }>('/v1/news-list');
  return (data.data ?? []).map((item) => ({
    ...item,
    photo: IMAGE_BASE_URL + item.photo.replace(/^\/+/, ''),
  }));
};

export const useNews = () => {
  const { data, isPending } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  return { news: data ?? [], loading: isPending && !data };
};
