import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || 'An unexpected error occurred.';

      toast.error(message);
    } else {
      toast.error('Network error. Please try again.');
    }

    return Promise.reject(error);
  }
);


export { api }
