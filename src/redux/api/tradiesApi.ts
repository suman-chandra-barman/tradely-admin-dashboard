import { baseApi } from "@/redux/api/baseApi";
import type {
  GetTradiesParams,
  GetTradiesResponse,
  GetTradieDetailsResponse,
} from "@/types/tradies";

export const tradiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTradies: builder.query<GetTradiesResponse, GetTradiesParams>({
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
          url: `/dashboard/tradies/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Tradie"],
    }),
    getTradieDetails: builder.query<GetTradieDetailsResponse, number>({
      query: (id) => ({
        url: `/dashboard/tradies/${id}/`,
        method: "GET",
      }),
      providesTags: ["Tradie"],
    }),
    changeApprovalStatus: builder.mutation<
      any,
      { id: number; approval_status: string }
    >({
      query: ({ id, approval_status }) => ({
        url: `/dashboard/tradies/${id}/approval/`,
        method: "PATCH",
        body: { approval_status },
      }),
      invalidatesTags: ["Tradie"],
    }),
    deleteTradie: builder.mutation<any, number>({
      query: (id) => ({
        url: `/dashboard/tradies/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tradie"],
    }),
  }),
});

export const {
  useGetTradiesQuery,
  useGetTradieDetailsQuery,
  useChangeApprovalStatusMutation,
  useDeleteTradieMutation,
} = tradiesApi;
