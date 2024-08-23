import { Schema, model } from "mongoose";

const messageSchema = new Schema(
{
  sender : {
    type : Schema.Types.ObjectId, //Id of the sender
    ref : "User",  // reference to the User model
  },
  content : {
    type : String,
    trim : true,
  },
  chatId : {
    type : Schema.Types.ObjectId,
    ref: "Chat",
  },
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{
    timestamps : true,
}
);

const Message = model('Message', messageSchema);
export default Message;

