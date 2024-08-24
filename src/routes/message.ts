import { Router } from "express";
import { sendMessage } from "../controllers/messageController";
import Auth from "../middleware/Auth";

const messageRoutes = Router();

messageRoutes.get('/:id', Auth); 
messageRoutes.post('/send/:id', Auth, sendMessage); //routes for sending a message

export default messageRoutes;