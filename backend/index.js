const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');  
const PORT = process.env.PORT || 5000;

//routes import
const userRoutes = require('./routes/userRoutes');
 const pdfRoutes = require('./routes/pdfRoutes');
const { logRequests } = require('./middlewares/loggingMiddleware');
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // specify the origin
    credentials: true, // allow credentials
  };

dbConnect();

app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequests);
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); //access file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router define
app.use('/api/users', userRoutes);
app.use('/api/pdfs', pdfRoutes);

//run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


