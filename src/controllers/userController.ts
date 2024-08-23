import { Request, Response } from "express"
import User from "../model/userModel";
import { compare, encrypt } from "../utils/bcrypt";

const login = async (req : Request, res : Response ) => {
  const { email , password } = req.body;
   
  if(!email || !password) return res.status(400);

  const userFound = await User.findOne({ email : email});
  if(!userFound) return res.status(400).send("Invalid Email");
 
  const passwordMatched = await compare(password, userFound.password);
  if(!passwordMatched) return res.status(401).send("Invalid Password");

  res.status(200).send("Login successfully");  
}

const signup = async (req : Request, res : Response) => {
  const { username , email , password } = req.body;

  if(!username || !email || !password) return res.status(400);

  const hashedPassword = await encrypt(password);
  new User({...req.body, password : hashedPassword }).save();

  return res.status(200).send("User account created successfully.");
}

export { login, signup }