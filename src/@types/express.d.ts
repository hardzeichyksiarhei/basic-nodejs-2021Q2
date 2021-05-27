declare namespace Express {
  interface Request {
    user?: import('../resources/users/user.type').TUser;
  }
}
