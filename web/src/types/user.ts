export type User = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  password?: string;
  fullName: string;
  roleId: string;
};

export type UserInfoCookie = {
  'email': string;
  'id': string;
  'full-name': string;
  'role-id': string;
};

export type UserInfoLogin = {
  email: string;
  password: string;
}

export type UserListResponse = {
  code: number;
  data: User[];
  message: string,
  total: number;
};

export type UserResponse = {
  code: number;
  data: User;
  message: string,
  total: number;
};

export type UserLoginResponse = Omit<UserResponse, "total">;
export type UserRegisterResponse = Omit<UserResponse, "total">;

export type UserUpdatePasswordRequest = {
  newPassword: string
}

export type UserUpdateRoleRequest = {
  newRoleId: string
}

export type UserUpdateInfoRequest = {
  fullName?: string
}

export type UserUpdatedResponse = {
  code: number;
  message: string
}

export type UserDeletedResponse = {
  code: number;
  message: string,
};