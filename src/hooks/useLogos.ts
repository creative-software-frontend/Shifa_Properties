import { useEffect, useState } from "react";

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

export const useLogos = () => {
  const [logos, setLogos] = useState<LogoState>({
    websiteLogo: '',
    headerLogo: '',
    footerLogo: '',
  });


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/website-logo-list`)
      .then((res) => res.json())
      .then((res: WebsiteLogoApiResponse) => {
        setLogos({
          websiteLogo:
            res.data?.website_logo?.file_path != null
              ? `${BASE_URL}/${res.data.website_logo.file_path}`
              : '',
          headerLogo:
            res.data?.header_logo?.file_path != null
              ? `${BASE_URL}/${res.data.header_logo.file_path}`
              : '',
          footerLogo:
            res.data?.footer_logo?.file_path != null
              ? `${BASE_URL}/${res.data.footer_logo.file_path}`
              : '',
        });

      })
      .catch((err) => {
        console.error("Logo fetch failed:", err);
      });
  }, []);

  return logos;
};

