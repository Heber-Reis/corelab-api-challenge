import mongoose from "mongoose";
import 'dotenv/config'

const DATABASE_URI = process.env.DATABASE_URI

const databaseMiddleware = async (req, res, next) => {
  try{
    if (!global.mongoose) {
      global.mongoose = await mongoose.connect(DATABASE_URI)
    }
  } catch (err){
    console.error(err);
    res.status(500).send('database error')
  }

  return next()
}

export default databaseMiddleware;