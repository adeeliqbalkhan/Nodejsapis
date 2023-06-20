const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const errorHandler = require("./middleware/errorHandler");
require('./services/db')
const multer = require('multer');
const app = express();

// Define storage configuration
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file")

// Use the Multer middleware for file upload
app.post('/upload', upload, (req, res) => {
    res.send("File upload")
});

//we use this body parser to get data from the client
app.use(express.json());
//Routes
app.use('/api/contact', require("./Routes/contactRoutes"));
app.use('/api/users', require("./Routes/userRoutes"));
app.use(errorHandler);

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server started on port ${PORT}`));