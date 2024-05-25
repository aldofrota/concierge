export type UserPermissions = {
  createRollout: boolean;
  updateRelease: boolean;
  removeRollout: boolean;
  createUser: boolean;
  admin: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  status: string;
  language: string;
  permission: UserPermissions;
};

export type QueryResponseUser = {
  users: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
