import { ApiResponse } from '@app/shared/response/api-response-ok';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  avatar: string | null;
  phone: string | null;
  provider: string;
  providerId: string | null;
  createdAt: Date | null;
}

export type ProfileResponse = ApiResponse<UserProfile>;
