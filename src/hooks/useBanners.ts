import { useEffect, useState } from "react";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;


export interface Banner {
  id: number;
  title: string;
  description: string;
  photo: string;
  image: string;
  // Used by HeroSection CTA logic.
  ctaLink?: string;
  cta?: Record<string, string>;
}


export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/banner-list`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (cancelled) return;
        const formatted: Banner[] = (res.data ?? []).map((banner: Omit<Banner, 'image'>) => ({
          ...banner,
          image: `${IMAGE_BASE_URL.replace(/\/$/, '')}/${banner.photo}`,
        }));
        setBanners(formatted);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
        console.error("Banner fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { banners, loading, error };
}