export enum UserFields {
  name = 'name',
  email = 'email',
  password = 'password',
}

export interface UserInterface {
  [UserFields.name]: string;
  [UserFields.email]: string;
  [UserFields.password]?: string;
}
