import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import CONFIG from "../constants/constants";
import User from "../model/user-model";

const protectedRoute = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, CONFIG.JWT_SECRET_KEY, async (err : any, user : any) => {
      if (err) return res.sendStatus(403);

      const verifiedUser = await User.findById({ _id : user._id}).select("-password");
      if (!verifiedUser) return res.status(404).json({ error: "User not found" });

      req.user = verifiedUser;
      next();
    });
  };

export default protectedRoute;