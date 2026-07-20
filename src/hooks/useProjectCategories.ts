import { useEffect, useState } from "react";

export interface ProjectCategory {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjectCategories = () => {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/project-category-list`)
      .then((res) => res.json())
      .then((res) => {
        if (cancelled) return;
        setCategories(res.data ?? []);
      })
      .catch((err) => {
        console.error("Project categories fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading };
};
