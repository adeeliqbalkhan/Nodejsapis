const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const errorHandler = require("./middleware/errorHandler");
require('./services/db')
const multer = require('multer');
const app = express();
const fileUpload = require('express-fileupload')

//we use this body parser to get data from the client
app.use(express.json());
//Routes
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/upload', require('./routes/uploadRoutes'))
app.use('/api/product', require('./routes/productRoute'))
app.use(errorHandler);


const PORT = process.env.PORT

app.listen(PORT, console.log(`Server started on port ${PORT}`));

