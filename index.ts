import express from 'express';
import 'dotenv/config'

const app = express();

app.use(express.json())


const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, () => {
    console.log('Listening to port', SERVER_PORT);
})
