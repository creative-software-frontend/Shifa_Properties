const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
export const getImageUrl = (path: string) => {
    if (!path) return "";
    return `${IMAGE_BASE_URL}/${path}`;
};