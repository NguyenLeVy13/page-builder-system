export type RoleMenu = {
  roleId: string;
  menuId: string;
}

export type RoleMenuListResponse = {
  code: number;
  data: RoleMenu[];
  message: string,
  total: number;
};

export type RoleMenuRegistedResponse = {
  code: number;
  message: string,
};

export type RoleMenuDeregistedResponse = {
  code: number;
  message: string,
};