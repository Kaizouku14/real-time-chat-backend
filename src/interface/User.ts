import { Types } from "mongoose"

export interface IUser {
    _id : Types.ObjectId
    username : string
    email : string
}   
