import { Request, Response } from "express"
import User from "../model/userModel";
import { compare, encrypt } from "../utils/bcrypt";
import { generateTokens } from "../utils/generateToken";

const login = async (req : Request, res : Response ) => {
  const { email , password } = req.body;
   
  if(!email || !password) return res.status(400);

  const userFound = await User.findOne({ email : email});
  if(!userFound) return res.status(400).send("Invalid Email");
 
  const passwordMatched = await compare(password, userFound.password);
  if(!passwordMatched) return res.status(401).send("Invalid Password"); 

  const{ accessToken , refreshToken } = await generateTokens(userFound);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }); 

  res.status(200).send({token : accessToken , message : "Login successfully"});  
}

const signup = async (req : Request, res : Response) => {
  const { username , email , password } = req.body;

  if(!username || !email || !password) return res.status(400);

  const userFound = await User.findOne({ email : email});
  if(userFound) return res.status(400).send("User already exists");

  const hashedPassword = await encrypt(password);
  new User({...req.body, password : hashedPassword }).save();

  return res.status(200).send("User account created successfully.");
}

const validateUser = async (req : Request, res : Response) => {
   console.log(req)

  const validUser = await User.findOne({ _id: req.user._id }).select("-password");
  if(!validUser) return res.json({ message: 'user is not valid' });
       

}

export { login, signup , validateUser }