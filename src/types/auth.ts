export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthFamily {
  id: number;
  name: string;
  relation: string;
  member_status: string;
}

export interface AuthUser {
  id?: number | string;
  user_id?: string;
  full_name?: string;
  email?: string;
  email_address?: string;
  phone_number?: string | null;
  whatsapp_number?: string;
  role?: string;
  is_email_verified?: boolean;
  is_admin?: boolean;
  profile_image?: string | null;
  account_type?: string;
  family?: AuthFamily;
}

export interface LoginRequest {
  email_address: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  tokens: AuthTokens;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface ForgotPasswordRequest {
  email_address: string;
}

export interface ForgotPasswordResponseData {
  email_address: string;
  purpose: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordResponseData>;

export interface VerifyForgotPasswordOtpRequest {
  email_address: string;
  otp_code: string;
}

export interface VerifyForgotPasswordOtpResponseData {
  user: AuthUser;
  tokens: AuthTokens;
}

export type VerifyForgotPasswordOtpResponse =
  ApiResponse<VerifyForgotPasswordOtpResponseData>;

export interface ResetPasswordRequest {
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResendForgotPasswordOtpRequest {
  email_address: string;
}

export type ResendForgotPasswordOtpResponse = ApiResponse<{
  email_address: string;
  purpose: string;
}>;

export interface RegisterRequest {
  full_name: string;
  email: string;
  whatsapp_number: string;
  password: string;
  confirm_password: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp_code: string;
}

