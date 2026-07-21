import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/imageUrl";

export interface BrochureItem {
  project_name: string;
  pdf: string;
  pdf_name: string;
  full_pdf_url: string;
}

export const useBrochures = () => {
  const [brochures, setBrochures] = useState<BrochureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/brochures-list`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (cancelled) return;
        const formatted: BrochureItem[] = (res.data ?? []).map((item: any) => ({
          ...item,
          full_pdf_url: getImageUrl(item.pdf),
        }));
        setBrochures(formatted);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
        console.error("Brochures fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { brochures, loading, error };
};
