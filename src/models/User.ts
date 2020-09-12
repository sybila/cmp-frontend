export interface LoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  permissions: number;
  email?: string;
  about?: string;
  picture?: string;

  // TODO: Implement groups (Model...)
  /* groups: {} */
}

// TODO: normalizer for this model and others
