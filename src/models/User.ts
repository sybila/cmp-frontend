export interface LoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface RegisterPayload {
  email: string;
  firstname: string;
  surname: string;
  username: string;
  password: string;
  isPublic: boolean;
  termsAndConditions: boolean;
}

type UserTier = {
  id: number;
  tier: number;
  name: string;
};

export interface UserModel {
  id: number;
  name: string;
  surname: string;
  username: string;
  type: UserTier;
  email: string;
  about?: string;
  picture?: string;
  groups: GroupModel[];
}

export interface GroupModel {
  id: number;
  name: string;
  role: number;
}

// TODO: normalizer for this model and others
