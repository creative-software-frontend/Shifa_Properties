import { useEffect, useState } from "react";

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
  reg_no: string;
  trading_id: string;
  created_at: string;
  updated_at: string;
}

export const useFooterInfo = () => {
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/footer-footer-info`)
      .then((res) => res.json())
      .then((res) => {
        if (cancelled) return;
        setFooterInfo(res.data ?? null);
      })
      .catch((err) => {
        console.error("Footer info fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { footerInfo, loading };
};
