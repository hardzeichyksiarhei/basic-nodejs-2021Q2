export interface TUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type TUserConstructor = { [P in keyof TUser]+?: TUser[P] };
export type TUserUpdate = { [P in keyof Omit<TUser, 'id'>]+?: TUser[P] };
