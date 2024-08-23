import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/user';
import dbConnection from './database/dbConnection';
import CONFIG from './constants/constants';

const app = express();
app.use(cookieParser()); 
app.use(express.json());

//routes
app.use('/', userRoutes); 

const server = createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(socket.id)
    console.log('connected');
})

server.listen(CONFIG.SERVER_PORT, () => {
    console.log('Listening to port', CONFIG.SERVER_PORT);
    dbConnection(); // database connection

});


