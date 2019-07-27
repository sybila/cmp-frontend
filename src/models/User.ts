export interface UserModel {
  id: number;
  username: string;
  permissions: number;
  email?: string;
  about?: string;

  // TODO: Implement groups (Model...)
  /* groups: {} */
}

// TODO: normalizer for this model and others
