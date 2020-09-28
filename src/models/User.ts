export interface LoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
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
