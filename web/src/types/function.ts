export type FuncType = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
}

export type FunctionListResponse = {
  code: number;
  data: FuncType[];
  message: string,
  total: number;
};

export type FunctionCreatedResponse = {
  code: number;
  message: string,
};

export type FunctionResponse = {
  code: number;
  data: FuncType;
  message: string,
  total: number;
};

export type FunctionUpdatedResponse = {
  code: number;
  message: string
}

export type FunctionDeletedResponse = {
  code: number;
  message: string,
};