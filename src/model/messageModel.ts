import { Schema, model } from "mongoose";

const messageSchema = new Schema({
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
},
{
    /* option used for mongoose to automatically add the two field 
     *   1. createdAt – the timestamp when the message was created.
     *   2. updatedAt – the timestamp when the message was last updated.
    */
    timestamps : true,
}
);

const Message = model('Message', messageSchema);
export default Message;

