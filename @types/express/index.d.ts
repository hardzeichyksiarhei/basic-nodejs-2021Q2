declare namespace Express {
  interface Request {
    user?: import('../../src/resources/users/user.entity').default;
  }
  interface Response {}
}
