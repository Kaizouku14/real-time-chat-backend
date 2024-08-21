import express from 'express';
import 'dotenv/config'
import userRoutes from './routes/user';

const app = express();
const SERVER_PORT = process.env.PORT || 3000;

//routes
app.use('/', userRoutes); 

app.use(express.json());
app.listen(SERVER_PORT, () => {
    console.log('Listening to port', SERVER_PORT);
});
