import { Router } from "express";
import { login, signup } from "../controllers/auth-controller";
import { refreshToken } from "../controllers/refresh-token-controller";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/signup', signup);

authRoutes.post('/refresh', refreshToken); 

export default authRoutes;