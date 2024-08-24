import { Request, Response } from "express"
import Chat from "../model/chat-model";
import Message from "../model/message-model";
import { getReceiverSocketId, io } from "../socket/socket";

const sendMessage = async (req : Request, res : Response) => {

   try{
      const { message }= req.body;
      const { id : receiverId } = req.params;
      const senderId = req.user._id;
   
     let conversation = await Chat.findOne({  
         participants : { $all : [senderId, receiverId]}, // Find a chat where both senderId and receiverId are participants
      })
   
      //if not conversation found create one
     if(!conversation) {
       conversation = await Chat.create({
         participants : [senderId, receiverId],
       })
     }

     const newMessage = new Message({
         senderId,
         receiverId,
         message
      })
   
		await Promise.all([conversation.save(), newMessage.save()]);
		const receiverSocketId = getReceiverSocketId(receiverId);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage); // io.to(<socket_id>).emit() used to send events to specific client
		}

		res.status(201).json(newMessage);
   }catch(err){
      console.log("Error in sendMessage controller: ", err);
		res.status(500).json({ error: "Internal server error" });
   }
}

const getMessages = async (req : Request, res : Response) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Chat.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (err) {
		console.log("Error in getMessages controller: ", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

export { sendMessage , getMessages };