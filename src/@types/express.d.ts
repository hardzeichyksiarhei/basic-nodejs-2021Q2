declare namespace Express {
  interface Request {
    user?: import('../resources/users/user.interface').IUser;
  }
}
