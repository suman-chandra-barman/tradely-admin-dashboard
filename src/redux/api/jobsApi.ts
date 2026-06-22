import { baseApi } from "@/redux/api/baseApi";
import type {
  GetJobsParams,
  GetJobsResponse,
  GetJobDetailsResponse,
} from "@/types/jobs";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<GetJobsResponse, GetJobsParams>({
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
          url: `/jobs/admin/jobs/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Job"],
    }),
    getJobDetails: builder.query<GetJobDetailsResponse, number>({
      query: (id) => ({
        url: `/jobs/admin/jobs/${id}/`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    deleteJob: builder.mutation<any, number>({
      query: (id) => ({
        url: `/jobs/admin/jobs/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useDeleteJobMutation,
} = jobsApi;
