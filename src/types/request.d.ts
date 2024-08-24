declare namespace Express {
    export interface Request {
      user: any;
      userID : string | undefined;
    }
}