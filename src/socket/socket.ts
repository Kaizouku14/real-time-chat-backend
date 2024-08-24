import { Server } from "socket.io";
import http from "http";
import express from "express";
import CONFIG from "../constants/constants";

const app = express();

const server = http.createServer(app);
  
interface UserSocketMap {
  [key: string]: string;
}

//all the active user will be stored in this object
const userSocketMap: UserSocketMap = {}; // {userId: socketId}

// Configure the Socket.io server with CORS
const io = new Server(server, {
  cors: {
    origin: CONFIG.CORS_ALLOWED_ORIGINS,
    methods: ["GET", "POST"], 
  },
});

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;   // Get the userId from the handshake query (as a string)

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users (userIds)
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => { 
    console.log("User disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId]; // remove disconnected user in the userSocketMap object
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // r-render online user
    }
  });
});

export { app, io, server };
