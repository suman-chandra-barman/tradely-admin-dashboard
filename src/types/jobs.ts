export interface Job {
  id: number;
  title: string;
  client_name: string;
  tradie_name: string | null;
  category_name: string;
  budget: string;
  status: "posted" | "active" | "matched" | "accepted" | "in_progress" | "completed" | "cancelled";
  posted_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface JobDetail {
  id: number;
  title: string;
  description: string;
  status: string;
  service_type: string;
  category: Category;
  images: string[];
  client_name: string;
  client_image: string | null;
  tradie_name: string | null;
  tradie_image: string | null;
  budget: string;
  budget_unit: string;
  urgency: string;
  duty_date: string;
  duration: number;
  address: string;
  latitude: string;
  longitude: string;
  posted_at: string;
  accepted_at: string | null;
  completed_at: string | null;
  has_review: boolean;
}

export interface GetJobsParams {
  status?: string;
  search?: string;
}

export interface GetJobsResponse {
  status: string;
  code: number;
  message: string;
  data: Job[];
}

export interface GetJobDetailsResponse {
  status: string;
  code: number;
  message: string;
  data: JobDetail;
}
