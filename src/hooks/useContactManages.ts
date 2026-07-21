import { useState, useEffect } from 'react';
import api from '../utils/api';

export interface ContactManageData {
  id: number;
  call_use: string;
  email: string;
  whatsapp: string;
  career: string;
  created_at?: string;
  updated_at?: string;
}

export const useContactManages = () => {
  const [contactData, setContactData] = useState<ContactManageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await api.get('/v1/contact-manages');
        if (response.data.success && response.data.data.length > 0) {
          setContactData(response.data.data[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch contact info');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactData, loading, error };
};
