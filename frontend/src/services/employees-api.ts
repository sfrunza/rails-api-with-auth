import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-service";
import { User } from "@/types/user";



export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<User[], void>({
      query: () => "/employees",
      providesTags(result) {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'Employee' as const, id })),
            { type: 'Employee', id: 'LIST' },
          ]
        }
        return [{ type: 'Employee', id: 'LIST' }]
      },
    }),
    getEmployeeById: builder.query<User, { id: string }>({
      query: ({ id }) => `/employees/${id}`,
      providesTags: (result, _, { id }) => {
        if (result) {
          return [{ type: 'Employee', id }]
        }
        return [{ type: 'Employee', id: 'LIST' }]
      },
    }),
    updateEmployee: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: { employee: data },
      }),
      invalidatesTags: (_, error, { id }) => error ? [] : [{ type: 'Employee', id }, { type: 'Employee', id: 'LIST' }]
    }),
    createEmployee: builder.mutation<User, { data: Partial<User> }>({
      query: ({ data }) => ({
        url: `/employees`,
        method: "POST",
        body: { employee: data },
      }),
      invalidatesTags: (_, error) => error ? [] : [{ type: 'Employee', id: 'LIST' }],
    }),
  }),
})

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery, useUpdateEmployeeMutation, useCreateEmployeeMutation } = employeesApi