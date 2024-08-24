import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dbConnection from './database/dbConnection';
import CONFIG from './constants/constants';
import { userRoutes, messageRoutes } from './routes';

const app = express();
app.use(cookieParser()); 
app.use(express.json());

//routes
app.use('/', userRoutes); 
app.use('/message', messageRoutes);

const server = createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {

    // socket.on('setup', (userData) => {  // When the client sends a 'setup' event (with some userData), the server:
    //     socket.join(userData.id);  // Joins the user to a "room" with their user ID (userData.id).
    //     socket.emit('connected'); //Sends a 'connected' event back to the user, indicating they are successfully connected.
    // });
      
    // socket.on('join room', (room) => {  //adding user in the room
    //     socket.join(room); 
    // });
      
    // socket.on('typing', (room) => socket.in(room).emit('typing'));  //broadcast 'typing' in all users in the room
    // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMsg) => {
       const chat = newMsg.chatId;
       if(!chat.users) console.log('chat users is not defined');

       chat.users.forEach((user : { _id : any }) => {
           if(user._id == newMsg.sender.id) return; // Don't send message to the sender
           socket.in(user._id).emit('message recieved', newMsg); //send message in all users in the chat
       })

    })
})

server.listen(CONFIG.SERVER_PORT, () => {
    console.log('Listening to port', CONFIG.SERVER_PORT);
    dbConnection(); // database connection
});


