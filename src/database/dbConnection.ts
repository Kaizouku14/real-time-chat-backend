import mongoose from 'mongoose';
import CONFIG from '../constants/constants';

function dbConnection () {
    mongoose.connect(CONFIG.MONGODB_URI)
            .then(() => console.log('database connected succesfully'))
            .catch((err) => console.log('error while connecting', err));
            
    mongoose.connection.on("disconnected", (err) => console.log("Mongodb connection disconnected"));        
}

export default dbConnection;







