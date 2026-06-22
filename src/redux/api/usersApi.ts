import { baseApi } from "@/redux/api/baseApi";
import type { GetUsersParams, GetUsersResponse, User } from "@/types/users";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.status && params.status !== "all") {
          queryParams.append("status", params.status);
        }
        if (params.search) {
          queryParams.append("search", params.search);
        }
        const queryString = queryParams.toString();
        return {
          url: `/dashboard/users/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getUserDetails: builder.query<{ status: string; code: number; message: string; data: User }, number>({
      query: (id) => ({
        url: `/dashboard/users/${id}/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    toggleBlockUser: builder.mutation<any, { id: number; is_blocked: boolean }>({
      query: ({ id, is_blocked }) => ({
        url: `/dashboard/users/${id}/block/`,
        method: "PATCH",
        body: { is_blocked },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<any, number>({
      query: (id) => ({
        url: `/dashboard/users/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
} = usersApi;
