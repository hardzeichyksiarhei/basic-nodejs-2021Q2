export interface IBaseUser {
  name: string;
  login: string;
  password: string;
}

export interface IBaseUserPartial extends Partial<IBaseUser> {}
export interface IBaseUserResponse extends Omit<IBaseUser, 'password'> {
  id: string;
}

export interface IUser extends IBaseUser {
  id: string;

  update(payload: IBaseUserPartial): Promise<IUser>;
}
