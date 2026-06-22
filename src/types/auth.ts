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
  email?: string;
  name?: string;
  phone_number?: string | null;
  role?: string;
  image?: string | null;
  is_verified?: boolean;
  is_approved?: boolean;
  created_at?: string;
  client_profile?: any;
  tradie_profile?: any;

  // Backward compatibility keys
  user_id?: string;
  full_name?: string;
  email_address?: string;
  whatsapp_number?: string;
  is_email_verified?: boolean;
  is_admin?: boolean;
  profile_image?: string | null;
  account_type?: string;
  family?: AuthFamily;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  tokens: AuthTokens;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponseData {
  email?: string;
  purpose?: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordResponseData | null>;

export interface VerifyForgotPasswordOtpRequest {
  email: string;
  code: string;
}

export interface VerifyForgotPasswordOtpResponseData {
  reset_token: string;
}

export type VerifyForgotPasswordOtpResponse =
  ApiResponse<VerifyForgotPasswordOtpResponseData>;

export interface ResetPasswordRequest {
  reset_token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResendForgotPasswordOtpRequest {
  email: string;
}

export type ResendForgotPasswordOtpResponse = ApiResponse<{
  email?: string;
  purpose?: string;
} | null>;

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


