import { Router } from "express";
import { login, signup, validateUser } from "../controllers/userController";
import Auth from "../middleware/Auth";
import { refreshToken } from "../controllers/authController";

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/signup', signup);
userRoutes.get('/auth', Auth, validateUser);
userRoutes.post('/refresh', refreshToken)

export default userRoutes;