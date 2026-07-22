import { img0, img4, img5, img7 } from '../data/landingData';

import type { Project } from '../types';

const IMAGE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
export const getImageUrl = (path: string) => {
    if (!path) return "";
    const cleanPath = path.replace(/^\/+/, "");
    const encoded = cleanPath
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    return `${IMAGE_BASE_URL.replace(/\/$/, "")}/${encoded}`;
};

// Image-only fallback for Project cards.
// Backend remains the source of truth for all business fields.
const defaultProjectImage = img0;

const PROJECT_FALLBACK_BY_TITLE: Record<string, string> = {
    'Padma Grand Hotel': img4,
    'Bay Sands Hotel': img5,
    'One City Residences': img7,
    'Kuakata Hotel': img0,
    'Kuakata Hotel test': img0,
};

const isNonEmptyString = (v: unknown): v is string =>
    typeof v === 'string' && v.trim().length > 0;

export const getProjectImage = (project: Project | null | undefined): string => {
    const backendImage = project?.photo ?? project?.image;
    if (isNonEmptyString(backendImage)) return getImageUrl(backendImage);

    const title = (project?.title ?? project?.name ?? '').trim();
    if (title && PROJECT_FALLBACK_BY_TITLE[title]) {
        return PROJECT_FALLBACK_BY_TITLE[title];
    }

    // Keep safe default; use local image assets only.
    return defaultProjectImage;
};
