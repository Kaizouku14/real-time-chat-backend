declare namespace Express {
    export interface Request {
      user: any,
      token: string,
      userID : string | undefined
    }
}