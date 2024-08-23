import jwt from 'jsonwebtoken'
import CONFIG from '../constants/constants'
import { IUser } from '../interface/User';

/**
 * Generates access and refresh tokens for a given user.
 *
 * @param {IUser} user - The user object containing _id, username, and email.
 * @return {Promise<{ accessToken: string, refreshToken: string }>} A promise resolving to an object containing the access token and refresh token.
 */

export const generateTokens = async (user : IUser ) => {
	try {
		const payload = { _id: user._id.toString(), username : user.username, email : user.email};
		const accessToken = jwt.sign(
			payload,
			CONFIG.JWT_SECRET_KEY,
			{ expiresIn: "1m" }
		);
		const refreshToken = jwt.sign(
			payload,
			CONFIG.JWT_REFRESH_KEY,
			{ expiresIn: "30d" }
		);

		return Promise.resolve({ accessToken, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
};