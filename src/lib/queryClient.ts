import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

function getStatus(error: unknown): number | undefined {
  if (axios.isAxiosError(error)) return error.response?.status;
  if (error && typeof error === 'object' && 'status' in error) {
    return Number((error as { status: unknown }).status);
  }
  return undefined;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 2,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: (failureCount, error) => {
        const status = getStatus(error);
        // Avoid retry storms that make rate limits worse
        if (status === 429) return failureCount < 1;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
      retryDelay: (attemptIndex, error) => {
        if (getStatus(error) === 429) return 8000;
        return Math.min(1000 * 2 ** attemptIndex, 5000);
      },
    },
  },
});
