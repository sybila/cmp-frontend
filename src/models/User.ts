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
