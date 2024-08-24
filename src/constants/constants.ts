import "dotenv/config"

const CONFIG = {
  SERVER_PORT : process.env.PORT || 3000 ,
  MONGODB_URI : process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb',
  JWT_SECRET_KEY : process.env.JWT_SECRET_KEY || 'secret-key',
  JWT_REFRESH_KEY : process.env.JWT_REFRESH_KEY || 'refresh-key'
}

export default CONFIG;