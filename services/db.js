const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongo_url = process.env.MONGO_URL;
const options = {
    useNewUrlParser: true,
};  
const db = mongoose.connect(mongo_url, options);  
console.log('Connected to MongoDB');