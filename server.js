const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const errorHandler = require("./middleware/errorHandler");
require('./services/db')
const multer = require('multer');
const app = express();

//we use this body parser to get data from the client
app.use(express.json());
//Routes
app.use('/api/contact', require("./Routes/contactRoutes"));
app.use('/api/users', require("./Routes/userRoutes"));
app.use('/api/upload', require("./Routes/Uploadroutes"));
app.use(errorHandler);
app.use('/image', express.static('upload/image'))
const PORT = process.env.PORT

app.listen(PORT, console.log(`Server started on port ${PORT}`));