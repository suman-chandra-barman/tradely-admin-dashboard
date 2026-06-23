import { baseApi } from "@/redux/api/baseApi";
import { updateUser } from "@/redux/slices/authSlice";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileSettings: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/settings/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === "success" && data.data) {
            dispatch(
              updateUser({
                name: data.data.name,
                email: data.data.email,
                image: data.data.image,
                phone_number: data.data.phone_number,
              })
            );
          }
        } catch (error) {
          // silently ignore
        }
      },
    }),
    updateProfileSettings: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/accounts/profile/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    changeProfilePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/accounts/profile/change-password/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getLegalDocuments: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/settings/legal/",
        method: "GET",
      }),
      providesTags: ["Legal"],
    }),
    getLegalDocumentById: builder.query<any, number>({
      query: (id) => ({
        url: `/dashboard/settings/legal/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Legal", id }],
    }),
    updateLegalDocument: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `/dashboard/settings/legal/${id}/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Legal"],
    }),
  }),
});

export const {
  useGetProfileSettingsQuery,
  useUpdateProfileSettingsMutation,
  useChangeProfilePasswordMutation,
  useGetLegalDocumentsQuery,
  useGetLegalDocumentByIdQuery,
  useUpdateLegalDocumentMutation,
} = settingsApi;
