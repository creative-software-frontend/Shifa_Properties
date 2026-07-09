import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

export const useLogos = () => {
  const [logos, setLogos] = useState({
    websiteLogo: null,
    headerLogo: null,
    footerLogo: null,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/website-logo-list`)
      .then((res) => res.json())
      .then((res) => {
        setLogos({
          websiteLogo: `${BASE_URL}/${res.data.website_logo.file_path}`,
          headerLogo: `${BASE_URL}/${res.data.header_logo.file_path}`,
          footerLogo: `${BASE_URL}/${res.data.footer_logo.file_path}`,
        });
      })
      .catch((err) => {
        console.error("Logo fetch failed:", err);
      });
  }, []);

  return logos;
};