import { Router } from "express";
import protectedRoute from "../middleware/protect-route";
import { sendMessage } from "../controllers/message-controller";

const messageRoutes = Router();

messageRoutes.get('/:id', protectedRoute); 
messageRoutes.post('/send/:id', protectedRoute, sendMessage); //routes for sending a message

export default messageRoutes;