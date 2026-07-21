import { useState, useEffect } from 'react';
import api from '../utils/api';

export interface InvestmentImage {
  id: number;
  our_investment_id: number;
  image_path: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvestmentCategory {
  id: number;
  title: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OurInvestmentItem {
  id: number;
  investment_category_id: number;
  title: string;
  rating: string;
  position: string;
  created_at?: string;
  updated_at?: string;
  images: InvestmentImage[];
  category: InvestmentCategory;
}

export interface OurInvestmentListResponse {
  success: boolean;
  data: OurInvestmentItem[];
}

// Module-level cache — survives remounts and StrictMode double-invoke.
// Stores the in-flight promise so concurrent calls share one request,
// then stores the resolved data so subsequent mounts skip the network entirely.
let _cache: OurInvestmentItem[] | null = null;
let _inFlight: Promise<OurInvestmentItem[]> | null = null;

const fetchOnce = (): Promise<OurInvestmentItem[]> => {
  if (_cache) return Promise.resolve(_cache);
  if (_inFlight) return _inFlight;

  _inFlight = api
    .get<OurInvestmentListResponse>('/v1/our-investment-list')
    .then((response) => {
      if (response.data && response.data.success) {
        const sorted = (response.data.data || []).sort(
          (a, b) => Number(a.position) - Number(b.position)
        );
        _cache = sorted;
        _inFlight = null;
        return sorted;
      }
      _inFlight = null;
      throw new Error('Failed to fetch investment list');
    })
    .catch((err) => {
      _inFlight = null;
      throw err;
    });

  return _inFlight;
};

export const useOurInvestmentList = () => {
  const [investments, setInvestments] = useState<OurInvestmentItem[]>(_cache ?? []);
  const [loading, setLoading] = useState<boolean>(!_cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cache) {
      // Data already in cache — nothing to fetch.
      setInvestments(_cache);
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetchOnce()
      .then((data) => {
        if (!cancelled) {
          setInvestments(data);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (!cancelled) {
          setError(err.message || 'Error fetching investments');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { investments, loading, error };
};
