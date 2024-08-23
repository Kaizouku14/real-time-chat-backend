import { Router } from "express";
import { login, signup, validateUser } from "../controllers/userController";
import Auth from "../middleware/Auth";

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/signup', signup);
userRoutes.get('/auth', Auth, validateUser);

export default userRoutes;