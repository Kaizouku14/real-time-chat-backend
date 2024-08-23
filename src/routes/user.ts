import { Router, Request } from "express";
import { login, signup } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/signup', signup);

export default userRoutes;