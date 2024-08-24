import { Request, Response } from "express";
import User from "../model/user-model";

const getAllUser = (req : Request, res : Response) => {
   try{
      const loggedUser = req.user._id;
      const filteredUser = User.find({ _id : { $ne : loggedUser } }).select("-password");

      res.status(200).json(filteredUser);
   }catch(err){
     console.log("Error in sendMessage controller: ", err);
     res.status(500).json({ error: "Internal server error" });
   }
}

export { getAllUser }