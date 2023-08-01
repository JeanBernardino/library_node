import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Paste your mongo_db uri
mongoose.connect(process.env.MONGO_DB)
let db = mongoose.connection

export default db