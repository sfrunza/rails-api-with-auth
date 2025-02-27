import { type TFilter } from '@/slices/requests-slice';
import { type TFullRequest } from '@/types/request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base-service';
import { type User } from '@/types/user';
import { setRequest } from '@/slices/request-slice';

interface GetRequestsResponse {
  requests: TFullRequest[],
  total_pages: number
}

type StatusCounts = Record<TFilter, number>;

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Request', 'StatusCounts'],
  endpoints: (builder) => ({
    getRequests: builder.query<GetRequestsResponse, { filter?: string, page?: number }>({
      query: ({ filter, page }) => {
        if (filter && page) {
          return `/requests?filter=${filter}&page=${page}`
        }
        return `/requests`
      },
      providesTags(result) {
        if (result) {
          return [
            ...result.requests.map(({ id }) => ({ type: 'Request' as const, id })),
            { type: 'Request', id: 'LIST' },
          ]
        }
        return [{ type: 'Request', id: 'LIST' }]
      },
    }),
    getStatusCounts: builder.query<StatusCounts, void>({
      query: () => `/requests/status_counts`,
      providesTags: () => [{ type: 'StatusCounts' }],
    }),
    getRequestById: builder.query<TFullRequest, { id: string }>({
      query: ({ id }) => `/requests/${id}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          dispatch(setRequest(result.data))
          console.log("result", result)
        } catch (error) {
          console.log("error", error)
        }
      }, providesTags: (_, __, { id }) => [{ type: 'Request', id }],
    }),
    updateRequest: builder.mutation<TFullRequest, { id: number, data: Partial<TFullRequest> }>({
      query: ({ id, data }) => ({
        url: `/requests/${id}`,
        method: 'PUT',
        body: { request: data },
      }),
      invalidatesTags: [{ type: 'Request', id: 'LIST' }, { type: 'StatusCounts' }]
    }),
    createRequest: builder.mutation<TFullRequest, Partial<TFullRequest>>({
      query: (request) => ({
        url: `/requests`,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: [{ type: 'Request', id: 'LIST' }],
    }),
    createCustomer: builder.mutation<User, Partial<User>>({
      query: (customer) => ({
        url: `/users`,
        method: 'POST',
        body: { user: { ...customer, password: window.crypto.randomUUID() } },
      }),
    }),
    updateCustomer: builder.mutation<User, { id: number, data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { user: data },
      }),
    }),
  }),
})

export const { useGetRequestsQuery, useGetStatusCountsQuery, useGetRequestByIdQuery, useUpdateRequestMutation, useCreateRequestMutation, useUpdateCustomerMutation, useCreateCustomerMutation } = requestsApi