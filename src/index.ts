import express from 'express';
import userRoutes from './routes/user';
import dbConnection from './database/dbConnection';
import CONFIG from './constants/constants';

const app = express();

app.use(express.json());
dbConnection();  // database connection

//routes
app.use('/', userRoutes); 

app.listen(CONFIG.SERVER_PORT, () => {
    console.log('Listening to port', CONFIG.SERVER_PORT);
});

