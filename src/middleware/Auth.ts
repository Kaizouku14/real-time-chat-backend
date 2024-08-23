import { Request, Response, NextFunction, request } from "express"
import jwt from 'jsonwebtoken'
import CONFIG from "../constants/constants";
import { Types } from "mongoose";

interface CustomRequest extends Request {
    user? : { 
      _id : Types.ObjectId, 
      username : string,    
      email : string 
    }
}

const Auth = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      if (!user || typeof user !== 'object') return res.sendStatus(401);
  
      req.user = {
        _id: user._id as Types.ObjectId,
        username: user.username,
        email: user.email,
      };
      next();
    });
  };

export default Auth;