export interface User {
  id: number;
  name: string;
  phone_number: string;
  location: string;
  total_jobs: number;
  is_blocked: boolean;
  created_at: string;
  email?: string;
}

export interface GetUsersParams {
  status?: string;
  search?: string;
}

export interface GetUsersResponse {
  status: string;
  code: number;
  message: string;
  data: User[];
}
