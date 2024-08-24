import { Schema , model } from "mongoose";

const userSchema = new Schema({
  username : 
    {
        type : String,
        required : true
    },
  email : 
    {
        type : String,
        required : true
    },
  password : 
    {
        type : String,
        required : true
    },
  bio: 
    {
        type: String,
        default: 'Available',
    },
  profilePic: 
    {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
});


const User = model('User', userSchema);
export default User;