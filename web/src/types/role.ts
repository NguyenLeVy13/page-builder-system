export type Role = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
}

export type RoleListResponse = {
  code: number;
  data: Role[];
  message: string,
  total: number;
};

export type RoleCreatedResponse = {
  code: number;
  message: string,
};

export type RoleResponse = {
  code: number;
  data: Role;
  message: string,
  total: number;
};

export type RoleUpdatedResponse = {
  code: number;
  message: string
}

export type RoleDeletedResponse = {
  code: number;
  message: string,
};