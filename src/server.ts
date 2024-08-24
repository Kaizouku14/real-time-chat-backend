import express from 'express';
import cookieParser from 'cookie-parser';
import dbConnection from './database/dbConnection';
import CONFIG from './constants/constants';
import { userRoutes, messageRoutes } from './routes';
import { app , server } from './socket/socket';

app.use(cookieParser()); 
app.use(express.json());

//routes
app.use('/', userRoutes); 
app.use('/message', messageRoutes);

server.listen(CONFIG.SERVER_PORT, () => {
    console.log('Listening to port', CONFIG.SERVER_PORT);
    dbConnection(); // database connection
});


