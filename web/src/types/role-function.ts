export type RoleFunction = {
  roleId: string;
  functionId: string;
}

export type RoleFunctionListResponse = {
  code: number;
  data: RoleFunction[];
  message: string,
  total: number;
};

export type RoleFunctionRegistedResponse = {
  code: number;
  message: string,
};

export type RoleFunctionDeregistedResponse = {
  code: number;
  message: string,
};