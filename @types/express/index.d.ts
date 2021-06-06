declare namespace Express {
  interface Request {
    user?: import('../../src/resources/users/user.interface').IUser;
  }
  interface Response {
    errorMessage?: string;
  }
}
