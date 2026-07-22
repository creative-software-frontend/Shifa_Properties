import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

type LogoState = {
  websiteLogo: string;
  headerLogo: string;
  footerLogo: string;
};

type LogoApiItem = {
  file_path?: string | null;
};

type WebsiteLogoApiResponse = {
  data?: {
    website_logo?: LogoApiItem | null;
    header_logo?: LogoApiItem | null;
    footer_logo?: LogoApiItem | null;
  };
};

const emptyLogos: LogoState = {
  websiteLogo: '',
  headerLogo: '',
  footerLogo: '',
};

const fetchLogos = async (): Promise<LogoState> => {
  const { data } = await api.get<WebsiteLogoApiResponse>('/v1/website-logo-list');
  return {
    websiteLogo:
      data.data?.website_logo?.file_path != null
        ? `${BASE_URL}/${data.data.website_logo.file_path}`
        : '',
    headerLogo:
      data.data?.header_logo?.file_path != null
        ? `${BASE_URL}/${data.data.header_logo.file_path}`
        : '',
    footerLogo:
      data.data?.footer_logo?.file_path != null
        ? `${BASE_URL}/${data.data.footer_logo.file_path}`
        : '',
  };
};

export const useLogos = () => {
  const { data } = useQuery({
    queryKey: ['website-logos'],
    queryFn: fetchLogos,
  });

  return data ?? emptyLogos;
};
