import { useEffect, useState } from "react";

const IMAGE_BASE_URL =
  "https://backend.shifaproperties.com/public/uploads/banners/";

export interface Banner {
  id: number;
  title: string;
  description: string;
  photo: string;
}

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/banner-list`)
      .then((res) => res.json())
      .then((res) => {
        const formatted = res.data.map((banner: Banner) => ({
          ...banner,
          image: IMAGE_BASE_URL + banner.photo,
        }));

        setBanners(formatted);
      })
      .catch((err) => {
        console.error("Banner fetch failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { banners, loading };
};