import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const MAX_CONCURRENT = 3;
let active = 0;
const queue: Array<() => void> = [];

type QueuedConfig = InternalAxiosRequestConfig & {
  __releaseSlot?: () => void;
};

function releaseSlot(config?: QueuedConfig) {
  const release = config?.__releaseSlot;
  if (!release) return;
  config.__releaseSlot = undefined;
  release();
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend.shifaproperties.com/api",
  timeout: 20000,
});

api.interceptors.request.use(
  (config) =>
    new Promise((resolve) => {
      const start = () => {
        active += 1;
        const queued = config as QueuedConfig;
        let released = false;
        queued.__releaseSlot = () => {
          if (released) return;
          released = true;
          active = Math.max(0, active - 1);
          const next = queue.shift();
          if (next) next();
        };
        resolve(queued);
      };

      if (active < MAX_CONCURRENT) start();
      else queue.push(start);
    })
);

api.interceptors.response.use(
  (response) => {
    releaseSlot(response.config as QueuedConfig);
    return response;
  },
  (error: AxiosError) => {
    releaseSlot(error.config as QueuedConfig | undefined);
    return Promise.reject(error);
  }
);

export default api;
