import { baseApi } from "@/redux/api/baseApi";
import { updateUser } from "@/redux/slices/authSlice";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpResponse,
  ResendForgotPasswordOtpRequest,
  ResendForgotPasswordOtpResponse,
} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/accounts/auth/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any): LoginResponse => {
        return {
          success: response.status === "success" || response.code === 200,
          message: response.message,
          data: {
            user: {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              phone_number: response.data.user.phone_number,
              role: response.data.user.role,
              image: response.data.user.image,
              is_verified: response.data.user.is_verified,
              is_approved: response.data.user.is_approved,
              created_at: response.data.user.created_at,
              client_profile: response.data.user.client_profile,
              tradie_profile: response.data.user.tradie_profile,
              // Backward compatibility mapping:
              user_id: String(response.data.user.id),
              full_name: response.data.user.name,
              email_address: response.data.user.email,
              is_email_verified: response.data.user.is_verified,
              is_admin: response.data.user.role === "admin",
            },
            tokens: {
              access: response.data.tokens.access,
              refresh: response.data.tokens.refresh,
            },
          },
        };
      },
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/accounts/auth/forgot-password/send-otp/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any): ForgotPasswordResponse => {
        return {
          success: response.status === "success" || response.code === 200,
          message: response.message,
          data: response.data,
        };
      },
    }),
    verifyForgotPasswordOtp: builder.mutation<
      VerifyForgotPasswordOtpResponse,
      VerifyForgotPasswordOtpRequest
    >({
      query: (data) => ({
        url: "/accounts/auth/forgot-password/verify-otp/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any): VerifyForgotPasswordOtpResponse => {
        return {
          success: response.status === "success" || response.code === 200,
          message: response.message,
          data: {
            reset_token: response.data.reset_token,
          },
        };
      },
    }),
    resendForgotPasswordOtp: builder.mutation<
      ResendForgotPasswordOtpResponse,
      ResendForgotPasswordOtpRequest
    >({
      query: (data) => ({
        url: "/accounts/auth/forgot-password/send-otp/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any): ResendForgotPasswordOtpResponse => {
        return {
          success: response.status === "success" || response.code === 200,
          message: response.message,
          data: response.data,
        };
      },
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/accounts/auth/forgot-password/reset/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any): ResetPasswordResponse => {
        return {
          success: response.status === "success" || response.code === 200,
          message: response.message,
        };
      },
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data.user));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    getUserAccountSettings: builder.query({
      query: () => ({
        url: "/auth/user/account-settings/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    updateUserAccount: builder.mutation({
      query: (formData) => ({
        url: "/auth/user/account-settings/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data?.user) {
            dispatch(updateUser(data.data.user));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data?.user) {
            dispatch(updateUser(data.data.user));
          }
        } catch {
          // silently ignore
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useGetUserAccountSettingsQuery,
  useUpdateUserAccountMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
