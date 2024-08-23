import { Router } from "express";
import { sendMessage } from "../controllers/messageController";
import Auth from "../middleware/Auth";

const messageRoutes = Router();

messageRoutes.post('/', Auth, sendMessage); //routes for sending a message

