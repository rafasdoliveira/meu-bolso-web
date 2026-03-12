export type PostRegisterInputDto = {
  name: string;
  email: string;
  password: string;
};

export type PostRegisterOutputDto = {
  id: number;
  name: string;
  email: string;
};
