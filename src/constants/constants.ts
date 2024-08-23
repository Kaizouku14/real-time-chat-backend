import 'dotenv/config'

const CONFIG = {
  SERVER_PORT : process.env.PORT || 3000,
  MONGODB_URI : process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb'
}

export default CONFIG;