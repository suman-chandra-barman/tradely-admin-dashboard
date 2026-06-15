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
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any): LoginResponse => {
        return {
          success: response.success,
          message: response.message,
          data: {
            user: {
              id: response.data.user.user_id,
              full_name: response.data.user.full_name,
              email: response.data.user.email_address,
              phone_number: response.data.user.phone_number,
              role: response.data.user.role,
              is_email_verified: response.data.user.is_email_verified,
              is_admin: response.data.user.is_admin,
            },
            tokens: {
              access: response.data.tokens.accessToken,
              refresh: response.data.tokens.refreshToken,
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
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<
      VerifyForgotPasswordOtpResponse,
      VerifyForgotPasswordOtpRequest
    >({
      query: (data) => ({
        url: "/auth/verify-reset-otp/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any): VerifyForgotPasswordOtpResponse => {
        return {
          success: response.success,
          message: response.message,
          data: {
            user: {
              email: response.data.user.email,
              full_name: response.data.user.full_name,
              role: response.data.user.role,
            },
            tokens: {
              access: response.data.accessToken,
              refresh: response.data.refreshToken,
            },
          },
        };
      },
    }),
    resendForgotPasswordOtp: builder.mutation<
      ResendForgotPasswordOtpResponse,
      ResendForgotPasswordOtpRequest
    >({
      query: (data) => ({
        url: "/auth/resend-forgot-password-otp/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
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
