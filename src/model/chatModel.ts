import { Schema , model } from "mongoose";

const chatSchema = new Schema(
{
    photo : {
        type : String,
        default : 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName : {
        type : String,
    },
    isGroup : {
        type : Boolean,
        default : false,
    },
    users : [
       {
         type : Schema.Types.ObjectId,
         ref : "User",
       }
    ]
},
  {
    timestamps : true,
  }
);

const chat = model('Chat', chatSchema);
export default chat;