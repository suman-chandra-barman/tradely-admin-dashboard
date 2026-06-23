import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/stats/",
        method: "GET",
      }),
      providesTags: ["Dashboard", "User", "Tradie", "Job"],
    }),
    getRecentActivity: builder.query<any, { limit?: number } | void>({
      query: (params) => {
        const limit = params?.limit ?? 10;
        return {
          url: `/dashboard/recent-activity/?limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard", "User", "Tradie", "Job"],
    }),
    getUserGrowth: builder.query<any, { year?: number } | void>({
      query: (params) => {
        const year = params?.year ?? 1;
        return {
          url: `/dashboard/charts/user-growth/?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    getJobsOverTime: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/charts/jobs-over-time/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  useGetUserGrowthQuery,
  useGetJobsOverTimeQuery,
} = dashboardApi;
