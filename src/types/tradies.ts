export interface Tradie {
  id: number;
  name: string;
  skills: string;
  service_area: string;
  rating: number;
  completed_jobs: number;
  approval_status: "approved" | "pending" | "suspended" | "rejected";
  is_blocked: boolean;
}

export interface GetTradiesParams {
  status?: string;
  search?: string;
}

export interface GetTradiesResponse {
  status: string;
  code: number;
  message: string;
  data: Tradie[];
}

export interface TradieDetail {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  image: string | null;
  joined_at: string;
  approval_status: "approved" | "pending" | "suspended" | "rejected";
}

export interface GetTradieDetailsResponse {
  status: string;
  code: number;
  message: string;
  data: TradieDetail;
}
