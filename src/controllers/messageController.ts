import { Request, Response } from "express"
import Message from "../model/messageModel";

const sendMessage = async (req : Request, res : Response) => {
   const { chatId,  message }= req.body;

//   let msg = await Message.create({ sender: req.rootUserId, message, chatId });

}

export { sendMessage };