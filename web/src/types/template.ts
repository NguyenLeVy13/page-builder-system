export type TemplateData = {
  content: any;
  root: {
    props: {
      title: string
    }
  };
  zones: any;
}

export type Template = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  data?: string;
};

export type TemplateListResponse = {
  code: number;
  data: Template[];
  message: string,
  total: number;
};

export type TemplateResponse = {
  code: number;
  data: Template;
  message: string,
  total: number;
};

export type TemplateCreatedResponse = {
  code: number;
  message: string,
};

export type TemplateDeletedResponse = {
  code: number;
  message: string,
};