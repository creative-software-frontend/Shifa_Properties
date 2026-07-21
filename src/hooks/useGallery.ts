import { useState, useEffect } from 'react';

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  file_path: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useGallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/image-gallery-list`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery items');
        }
        const json = await response.json();
        if (json.success && json.data) {
          setGallery(json.data);
        } else {
           throw new Error('Invalid response structure');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { gallery, loading, error };
};
