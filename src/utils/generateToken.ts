import jwt from 'jsonwebtoken'
import CONFIG from '../constants/constants'
import { Types } from 'mongoose'

interface IUser {
    _id : Types.ObjectId
    username : string
    email : string
}

/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param {IUser} user - The user object containing _id, username, and email.
 * @return {string} The generated JWT token.
 */

export const generateToken = (user : IUser): string => {
    const generatedToken = jwt.sign
       ({ 
           id : user._id, 
           user : user.username, 
           email : user.email 
        }, 
        CONFIG.JWT_SECRET_KEY, {  expiresIn: '24h' })

   return generatedToken;
}