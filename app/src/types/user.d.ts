export type UserPermissions = {
  create_rollout: boolean;
  update_release: boolean;
  remove_rollout: boolean;
  admin: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  status: string;
  language: string;
  permissions: UserPermissions;
};
