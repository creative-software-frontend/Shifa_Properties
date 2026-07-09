import { useEffect, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  model: string;
  company: string;
  rating: string;
  message: string;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/investor-say-list`)
      .then((res) => res.json())
      .then((res) => {
        setTestimonials(res.data || []);
      })
      .catch((err) => {
        console.error("Testimonials fetch failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { testimonials, loading };
};