import jwt from "jsonwebtoken";
import CONFIG from "../constants/constants";
import { IUser } from "../interface/User";

interface VerifyRefreshTokenResponse {
    tokenDetails?: IUser;
    message : string;
}

const verifyRefreshToken = async (refreshToken: string): Promise<VerifyRefreshTokenResponse> => {
    const privateKey = CONFIG.JWT_REFRESH_KEY;

    try {
		const tokenDetails = jwt.verify(refreshToken, privateKey) as IUser;
        return {
            tokenDetails,
            message: "Valid refresh token",
        };
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return { message: "Invalid refresh token"};
        }
        return { message: "Token verification error"};
    }
};

export default verifyRefreshToken;