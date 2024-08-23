import { Request, Response, NextFunction, request } from "express"
import jwt from 'jsonwebtoken'
import CONFIG from "../constants/constants";

const Auth = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
  
      req.user = user;
      next();
    });
  };

export default Auth;