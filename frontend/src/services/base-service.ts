import { toast } from "sonner";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logout, updateToken } from "@/slices/auth-slice";

// export interface SerializedError {
//   name?: string
//   message?: string
//   stack?: string
//   code?: string
// }

export type QueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

const baseQuery: QueryFn = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});


export const baseQueryWithReauth: QueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // Handle token expiration or invalid token
  if (result.error && result.error.status === 401) {
    // Optionally, handle token refresh here or logout the user
    // api.dispatch(logout());
  } else if (result.data && result.meta?.response?.headers) {
    // If a new token is provided in the headers, update it in the state
    const newToken = result.meta.response.headers
      .get("Authorization")
      ?.split(" ")[1];
    if (newToken) {
      // api.dispatch(updateToken({ token: `Bearer ${newToken}` }));
    }
  }

  return result;
};

export interface ApiError {
  status: number;
  data?: {
    error?: string;
  };
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as ApiError

    console.error('RTK Query Error:', error);

    if (error?.status === 422) {
      const errorData = error?.data;
      if (errorData && typeof errorData === 'object') {
        Object.entries(errorData).forEach(([key, value]) => {
          const message = Array.isArray(value) ? value.join(", ") : value;
          toast.error(`${key.split("_").join(" ")} ${message}`);
        });
      }
    } else if (error?.status === 500) {
      toast.error('Server Error! Please try again later.');
    } else {
      toast.error(error?.data?.error || 'An unexpected error occurred.');
    }
  }

  return next(action);
};

