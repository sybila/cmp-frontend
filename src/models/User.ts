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
  tier: string;
  name: string;
};

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  permissions: UserTier;
  email?: string;
  about?: string;
  picture?: string;

  // TODO: Implement groups (Model...)
  /* groups: {} */
}

// TODO: normalizer for this model and others
