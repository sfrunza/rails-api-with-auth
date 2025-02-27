import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-service";

export type Setting = {
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  move_size_options: {
    id: number;
    name: string;
    value: string;
    movers_count: number[][];
  }[];
  floor_options: {
    id: number;
    name: string;
    value: string;
  }[];
};

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    getSettings: builder.query<Setting, void>({
      query: () => `/settings`,
      providesTags: ["Setting"],
    }),
    bulkUpdateSettings: builder.mutation<Setting, { data: Partial<Setting> }>({
      query: ({ data }) => ({
        url: `/settings/bulk_update`,
        method: "POST",
        body: { setting: data }
      }),
      invalidatesTags: (_, error) => error ? [] : ["Setting"],
    }),
    updateLogo: builder.mutation<Setting, { data: FormData }>({
      query: ({ data }) => ({
        url: `/settings/bulk_update`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Setting"],
    }),
  }),

});

export const { useGetSettingsQuery, useBulkUpdateSettingsMutation, useUpdateLogoMutation } = settingsApi;
