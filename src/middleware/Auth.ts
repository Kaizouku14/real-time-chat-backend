import { Request, Response, NextFunction, request } from "express"
import jwt from 'jsonwebtoken'
import CONFIG from "../constants/constants";
import User from "../model/userModel";

const Auth = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, CONFIG.JWT_SECRET_KEY, async (err : any, user : any) => {
      if (err) return res.sendStatus(403);
      if(!user) return res.sendStatus(401);

      const verifiedUser = await User
             .findOne({ _id : user._id})
             .select('-password');

      req.user = verifiedUser;
      req.userID = verifiedUser?._id.toString();
      next();
    });
  };

export default Auth;