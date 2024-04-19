export type Menu = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  pathname: string;
}

export type MenuListResponse = {
  code: number;
  data: Menu[];
  message: string,
  total: number;
};

export type MenuCreatedResponse = {
  code: number;
  message: string,
};

export type MenuResponse = {
  code: number;
  data: Menu;
  message: string,
  total: number;
};

export type MenuUpdatedResponse = {
  code: number;
  message: string
}

export type MenuDeletedResponse = {
  code: number;
  message: string,
};