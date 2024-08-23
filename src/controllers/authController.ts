import { Request, Response } from "express"
import verifyRefreshToken from "../utils/verifyRefreshToken";
import CONFIG from "../constants/constants";
import jwt from 'jsonwebtoken'

export const refreshToken = async (
    req: Request,
    res: Response
  ) => {
    try {
        const cookies = req.cookies;
  
        if (!cookies.jwt) return res.status(401).json({ message : "Unauthorized"});
  
        const refreshToken = cookies.jwt;
  
        try {
            const { tokenDetails } = await verifyRefreshToken(refreshToken);
            const payload = { _id: tokenDetails?._id, username: tokenDetails?.username, email: tokenDetails?.email, roles: tokenDetails?.roles };
            jwt.sign(
                payload,
                CONFIG.JWT_SECRET_KEY,
                { expiresIn: "1m" },
                (err, accessToken) => {
                    if (err) {
                        return res.status(500).json({ message: "Token generation error" });
                    }
  
                    res.status(200).json({
                        accessToken,
                        message: "Access token created successfully",
                    });
                }
            );
        } catch (err: any) { // Narrowing the error type
          if (err instanceof Error) {
              res.status(400).json({ message: err.message });
          } else {
              res.status(400).json({ message: 'Unknown error occurred' });
          }
      }
  
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };
  